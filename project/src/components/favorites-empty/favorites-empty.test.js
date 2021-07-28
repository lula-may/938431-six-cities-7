import React from 'react';
import {render} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <FavoritesEmpty />,
    );
    const bElement = getByText('Nothing yet saved.');
    const pElement = getByText('Save properties to narrow down search or plan your future trips.');

    expect(bElement).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
  });
});
