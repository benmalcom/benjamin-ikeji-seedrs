import React from 'react';
import { render } from '@testing-library/react';
import WeatherInfo from 'domain/WeatherInfo';
import { createTestStore } from 'utils/test/test-utils';
import { Provider } from 'react-redux';


describe('domain > WeatherInfo', () => {
  const getComponent = props => render(<Provider store={createTestStore()}><WeatherInfo {...props} /></Provider>);

  it('renders without crash', async () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

});