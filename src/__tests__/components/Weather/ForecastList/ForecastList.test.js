import React from 'react';
import { render } from '@testing-library/react';
import ForecastList from 'components/Weather/ForecastList';
import mockWeatherData from 'utils/mock-data/weatherData.json';
import { createTestStore } from 'utils/test/test-utils';
import { Provider } from 'react-redux';

describe('ForecastList', () => {
  const getComponent = props => render(<Provider store={createTestStore()}><ForecastList {...props} /></Provider>);

  it('renders without crash', async () => {
    const forecast = {
      list: mockWeatherData,
      city: 'London',
      id: "uuid123"
    };
    const removeForecast = jest.fn();
    const currentMetric = 'C';
    const component = getComponent({
      forecast,
      removeForecast,
      currentMetric
    });
    expect(component).toMatchSnapshot();
  });
});