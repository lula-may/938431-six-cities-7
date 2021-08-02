import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router, Route, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import BookmarkButton from './bookmark-button';
import {AppRoute, AuthorizationStatus} from '../../const';

const mockStore = configureStore({});
let history;

describe('Component: Bookmark Button', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should run passed callback on Button Click when user is authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });
    const onBookmarkButtonClick = jest.fn();

    const fakeComponent = (
      <Provider store={store} >
        <Router history={history}>
          <BookmarkButton
            buttonClassName='button'
            isFavorite
            onClick={onBookmarkButtonClick}
          />
        </Router>
      </Provider>
    );
    render(fakeComponent);
    expect(screen.getByRole('button')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(onBookmarkButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should redirect to Sign In page on Bookmark Button click when user is not authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });
    const onBookmarkButtonClick = jest.fn();
    history.push('/fake');

    const fakeComponent = (
      <Provider store={store} >
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.LOGIN}>
              <h1>This is Sign In page</h1>
            </Route>
            <Route>
              <BookmarkButton
                buttonClassName='button'
                isFavorite
                onClick={onBookmarkButtonClick}
              />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
    render(fakeComponent);
    expect(screen.getByRole('button')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(onBookmarkButtonClick).toHaveBeenCalledTimes(0);
    expect(screen.getByText(/This is Sign In page/i)).toBeInTheDocument();
  });
});
