import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import Logo from './logo';
import {AppRoute} from '../../const';

let history = null;

describe('Component: Header', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    render(
      <Router history={history} >
        <Logo isActive/>
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('header__logo-link--active');
  });

  it('should navigate to Main page on logo click', () => {
    history.push('/fake');

    render(
      <Router history={history} >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <h1>This is Main page</h1>
          </Route>
          <Route>
            <Logo/>
          </Route>
        </Switch>
      </Router>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('This is Main page')).toBeInTheDocument();
  });
});
