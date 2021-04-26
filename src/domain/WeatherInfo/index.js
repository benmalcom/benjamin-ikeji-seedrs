import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { fetchForecasts, resetForecastState, applyMetricToForecasts, setCurrentMetric, removeForecast } from 'redux/actions';
import { requestKeys } from 'services/_request/keys';
import ForecastList from 'components/Weather/ForecastList';
import MetricSwitcher from 'components/Weather/MetricSwitcher';
import LocationSearch from 'components/Weather/LocationSearch';
import Message from 'components/UI/Message';


const Forecast = () => {

  const dispatch = useDispatch();
  const { forecasts, loading, currentMetric } = useSelector(({ forecasts, ui }) => ({
    forecasts: forecasts.byList,
    currentMetric: forecasts.currentMetric,
    loading: ui.loading[requestKeys.fetchForecasts],
  }));

  const getForecasts = (query) => dispatch(fetchForecasts({ q: query, units: 'metric' }));

  useEffect(() => {
    return () => {
      dispatch(resetForecastState());
    };
  }, []);

  useEffect(() => {
    if (forecasts?.length)
      dispatch(applyMetricToForecasts(currentMetric));
  }, [currentMetric]);

  const onMetricChange = e => dispatch(setCurrentMetric(e.target.value));

  const onItemClick = (value) => {
    if (value) {
      getForecasts(value);
    }
  };

  const onRemoveForecast = id => dispatch(removeForecast(id));

  const handleInputKeyUp = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const value = e.target.value;
      getForecasts(value);
    }
  }

  const hasItems = forecasts?.length > 0;

  return <Container>
    <LocationSearch onItemClick={onItemClick} loading={loading} handleInputKeyUp={handleInputKeyUp} />
    {hasItems && !loading && <MetricSwitcher value={currentMetric} onChange={onMetricChange} />}
    {loading && <Message message="Loading..." />}
    {!loading && !hasItems && <Message message="No forecast items yet, use the search option above" />}
    <Grid container>
      {forecasts.map(forecast => <ForecastList
        key={forecast.id}
        forecast={forecast}
        removeForecast={onRemoveForecast}
        currentMetric={currentMetric}
        metric={currentMetric}
      />)}
    </Grid>
  </Container>;

};

export default Forecast;