import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';

let fakeCitiesList = null;
let history = null;
const mockStore = configureStore({});

describe('Component: Cities List', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    const store = mockStore({
      OFFERS: {currentCity: 'Paris'},
    });

    fakeCitiesList = (
      <Provider store={store}>
        <Router history={history}>
          <CitiesList />
        </Router>
      </Provider>
    );
  });

  it('should render correctly', () => {
    render(fakeCitiesList);

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getByText(/Brussels/i)).toBeInTheDocument();
    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getByText(/Hamburg/i)).toBeInTheDocument();
    expect(screen.getByText(/Dusseldorf/i)).toBeInTheDocument();
  });

  it('should run callback with argument "Amsterdam" on Tab click', () => {
    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeCitiesList);

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Amsterdam/i));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({'payload': 'Amsterdam', 'type': 'OFFERS/SET_CITY'});
    expect(dispatch).toHaveBeenCalledWith({'payload': undefined, 'type': 'OFFERS/RESET_SORT_TYPE'});
  });
});
