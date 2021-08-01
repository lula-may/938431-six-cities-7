import React from 'react';
import {render} from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Error', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <Spinner />,
    );
    const spanElement = getByText('Loading...');

    expect(spanElement).toBeInTheDocument();
  });
});
