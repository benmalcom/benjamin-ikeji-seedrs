import {
  FETCH_FORECASTS,
  RESET_FORECAST_STATE,
  SET_CURRENT_METRIC,
  REMOVE_FORECAST,
  UPDATE_FORECAST_LIST
} from '../actions';
import { metricValues } from '../../utils/forecast';

const initialState = {
  currentMetric: metricValues.CELCIUS,
  byList: [],
};

const forecastReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_FORECASTS.ERROR:
    case FETCH_FORECASTS.SUCCESS: {
      return Object.assign({}, state, {
        ...state,
        byList: [payload,...state.byList]
      });
    }
    case SET_CURRENT_METRIC:
      return {
        ...state,
        currentMetric: payload.metric,
      };
    case UPDATE_FORECAST_LIST:
      return {
        ...state,
        byList: payload,
      };
    case REMOVE_FORECAST:
      return {
        ...state,
        byList: state.byList.filter(item => item.id !== payload.id),
      };
    case RESET_FORECAST_STATE:
      return initialState;
    default:
      return state;
  }
};

export default forecastReducer;

