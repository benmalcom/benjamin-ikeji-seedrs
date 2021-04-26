import React from 'react';
import { render } from '@testing-library/react';
import Loading from 'components/UI/Message';

describe('Loading', () => {
  it('renders properly', async () => {
    const component = render(<Loading />);
    expect(component).toMatchSnapshot();
  });

});