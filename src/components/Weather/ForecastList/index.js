import React from 'react';
import { v1 as uuid } from 'uuid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ForecastList.module.scss';

import Forecast from '../Forecast';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import forecastProptypes from 'utils/prop-types/forecast';

const ForecastList = (props) => {
  const { currentMetric, removeForecast, forecast } = props;

  return <Container className={styles.container}>
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={styles.box}>
      <span className={styles.city}>{forecast.city}</span>
      <span className={styles.cancel} onClick={() => removeForecast(forecast.id)}>x</span>
    </Grid>
    <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} className={styles.grid}>

      {
        forecast.list?.length > 0 ? forecast.list.map(item => <Grid key={uuid()}  item xs={12} lg={4} md={4} sm={6}>
          <Forecast
            currentMetric={currentMetric}
            weatherData={item} />
        </Grid>) : <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={styles.grid}>
          <Paper className={styles['no-forecast']}>
            <Typography variant="subtitle1" component="h2" color="error">
              {forecast.message}
            </Typography>
          </Paper>
        </Grid>
      }
    </Grid>
  </Container>;
};

ForecastList.propTypes = {
  forecast: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape(forecastProptypes)).isRequired,
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }),
  currentMetric: PropTypes.string.isRequired,
  removeForecast: PropTypes.func.isRequired,
};

export default ForecastList;