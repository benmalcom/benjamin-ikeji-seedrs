import { groupBy, last } from 'lodash';
import dayjs from 'dayjs';
import { v1 as uuid } from 'uuid';
import {
  apiRequest,
  APPLY_METRICS_TO_FORECASTS,
  FETCH_FORECASTS,
  updateForecastList,
  setCurrentMetric,
} from '../actions';
import { requestKeys } from 'services/_request/keys';
import { celsiusToFahrenheit, fahrenheitToCelcius, metricValues } from 'utils/forecast';

const fetchForecasts = ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type === FETCH_FORECASTS.START) {
    const { ui: { pagination } } = getState();
    const { key = requestKeys.fetchForecasts, params, ...rest } = action.meta;

    const defaultPagination = pagination.default;

    console.log("params ", params);

    dispatch(
      apiRequest({
        url: '/forecast',
        key: key,
        params: {
          ...params,
          ...defaultPagination,
        },
        onSuccess: data => {
          const payload = { city: data?.city?.name, id: uuid() };
          const byDate = groupBy(data?.list || [], item => dayjs(item.dt_txt).format('DD/MM/YYYY'));
          const forecasts = Object.values(byDate).map(groupList => last(groupList));
          payload.list = forecasts.length > 3 ? forecasts.slice(0, 3) : forecasts;
          if (!forecasts.length) {
            payload.message = 'No weather information about this city';
          }
          dispatch({ type: FETCH_FORECASTS.SUCCESS, payload });
        },
        onError: e => {
          const payload = {
            list: [],
            id: uuid(),
            message: Number(e?.cod) === 404 ? 'No weather information about this city' : 'Weather information not available',
            city: params?.q
          };
          dispatch({ type: FETCH_FORECASTS.ERROR, payload });
        },
        ...rest,
      }),
    );
  }
};

const applyMetricToForecasts = ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type === APPLY_METRICS_TO_FORECASTS) {
    const { metric } = action.meta;
    const { forecasts: { byList } } = getState();
    if (!metric || !byList?.length)
      return;
    const payload = byList.map(forecast => {
      const isToCelcius = metricValues.CELCIUS === metric;
      const metricFunc = isToCelcius ? fahrenheitToCelcius : celsiusToFahrenheit;

      return {
        ...forecast,
        list: forecast.list.map(item => ({
          ...item,
          main: {
            ...item.main,
            temp: metricFunc(item.main?.temp),
            feels_like: metricFunc(item.main?.feels_like),
            temp_min: metricFunc(item.main?.temp_min),
            temp_max: metricFunc(item.main?.temp_max),
          },
        })),
      };
    });
    dispatch(updateForecastList(payload));
    dispatch(setCurrentMetric(metric));
  }
};

export default [fetchForecasts, applyMetricToForecasts];
