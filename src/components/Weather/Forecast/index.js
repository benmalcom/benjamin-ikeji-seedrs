import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import forecastPropTypes from 'utils/prop-types/forecast';

import styles from './Forecast.module.scss';
import { metricValuesIconMap, roundToTemp } from 'utils/forecast';


const Forecast = (props) => {
  const { weatherData, currentMetric } = props;

  const isToday = dayjs().isSame(dayjs(weatherData.dt_txt), 'day');

  const wordedDate = `${dayjs(weatherData.dt_txt).format(`DD MMM, YYYY`)}${isToday ? ' (Today)' : ''}`.trim();

  return <Card className={styles.card} >
    <CardContent>
      <Typography variant="subtitle2" align='center' color="textSecondary" component="h6">
        {wordedDate}
      </Typography>
      <CardMedia
        className={styles.image}
        component='img'
        alt='forecast-icon'
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
      />
      <Typography variant='body2' color='textSecondary' align='center'>
        {weatherData.weather[0]?.main}
      </Typography>
      <Typography gutterBottom variant='h4' component='h2' align='center'>
        {`${roundToTemp(weatherData.main.temp)}${metricValuesIconMap[currentMetric]}`}

      </Typography>
      <Typography variant='subtitle1' color='textSecondary' align='center' component='p'>
        Feels like {`${roundToTemp(weatherData.main.feels_like)}${metricValuesIconMap[currentMetric]}`}
      </Typography>
    </CardContent>
  </Card>;
};

Forecast.propTypes = {
  weatherData: PropTypes.shape(forecastPropTypes).isRequired,
  currentMetric: PropTypes.string.isRequired,
};

export default Forecast;