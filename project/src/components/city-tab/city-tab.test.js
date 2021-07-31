import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import CityTab from './city-tab';

let fakeCityTab = null;
let history = null;
let handleTabClick = null;

describe('Component: City Tab', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    handleTabClick = jest.fn((...args) => [...args]);
    fakeCityTab = (
      <Router history={history}>
        <CityTab
          isActive
          cityName="Moscow"
          onTabClick={handleTabClick}
        />
      </Router>
    );
  });
  it('should render correctly', () => {
    render(fakeCityTab);

    expect(screen.getByText(/Moscow/i)).toBeInTheDocument();
  });

  it('should run callback with argument "Moscow" on Tab click', () => {
    render(fakeCityTab);

    expect(screen.getByText(/Moscow/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Moscow/i));

    expect(handleTabClick).toHaveBeenCalledTimes(1);
    expect(handleTabClick).toHaveBeenCalledWith('Moscow');
  });
});
