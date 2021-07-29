import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CityTab from './city-tab';

let fakeCityTab = null;
let history = null;

describe('Component: City Tab', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    fakeCityTab = (
      <Router history={history}>
        <CityTab
          isActive
          cityName="Moscow"
          onTabClick={() => {}}
        />
      </Router>
    );
  });
  it('should render correctly', () => {
    render(fakeCityTab);

    expect(screen.getByText(/Moscow/i)).toBeInTheDocument();
  });
});
