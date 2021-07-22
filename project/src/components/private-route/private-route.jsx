import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Error from '../error/error';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import {AppRoute} from '../../const';
import {getLoginError, getUserLoadingStatus, selectIsAuthorized} from '../../store/user/selectors';

function PrivateRoute({children, path, exact}) {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isLoading = useSelector(getUserLoadingStatus);
  const isError = useSelector(getLoginError);

  if (isLoading) {
    return (
      <div className="page">
        <Header />
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="page">
        <Header />
        <Error />
      </div>
    );
  }
  return (
    <Route
      path={path}
      exact={exact}
    >
      {isAuthorized ? children : <Redirect to={AppRoute.LOGIN} />}
    </Route>
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
