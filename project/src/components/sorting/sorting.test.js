import React from 'react';
import {render, screen} from '@testing-library/react';
// import {Router, Route} from 'react-router-dom';
// import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import Sorting from './sorting';
import {SortType} from '../../const';
// import { AuthorizationStatus } from '../../const';

let fakeSorting = null;
const mockStore = configureStore({});
let store = null;

describe('Component: Sorting', () => {
  beforeAll(() => {
    store = mockStore({
      OFFERS: {
        sortType: SortType.POPULAR,
      },
    });

    fakeSorting = (
      <Provider store={store} >
        <Sorting />
      </Provider>
    );
  });

  it('should render Sorting closed', () => {
    render(fakeSorting);

    expect(screen.getByTestId('sorting-type')).toHaveTextContent(/Popular/i);
    expect(screen.getByRole('list')).toHaveClass('places__options');
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should open Sorting list on list click and close list on the second click', () => {
    render(fakeSorting);

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    userEvent.click(screen.getByTestId('sorting-type'));

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    userEvent.click(screen.getByTestId('sorting-type'));
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should change active Sort type on new Sort type click', () => {
    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeSorting);

    expect(screen.getByTestId('sorting-type')).toHaveTextContent(/Popular/i);
    userEvent.click(screen.getByTestId('sorting-type'));

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
    expect(screen.getByText(/Popular/i, {selector: 'li'})).toHaveClass('places__option--active');
    expect(screen.getByText(/Top rated first/i, {selector: 'li'})).not.toHaveClass('places__option--active');

    userEvent.click(screen.getByText(/Top rated first/i, {selector: 'li'}));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({payload: 'rating', type: 'OFFERS/SET_SORT_TYPE'});
  });
});
