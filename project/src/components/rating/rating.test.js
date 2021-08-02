import React from 'react';
import {render, screen} from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    render(
      <Rating
        parentClass='parent'
        rating={4}
      >
        <span>This is children</span>
      </Rating>,
    );

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText('This is children')).toBeInTheDocument();
  });
});
