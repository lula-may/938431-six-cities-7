import React from 'react';
import {render} from '@testing-library/react';
import Error from './error';

describe('Component: Error', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <Error />,
    );
    const headerElement = getByText('We failed to load data.');
    const pElement = getByText('Please, check your internet connection or try again later.');

    expect(headerElement).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
  });
});
