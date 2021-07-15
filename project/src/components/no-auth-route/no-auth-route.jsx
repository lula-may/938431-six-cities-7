import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user/selectors';

function NoAuthRoute({children, path, exact}) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      path={path}
      exact={exact}
    >
      {authorizationStatus !== AuthorizationStatus.AUTH
        ? children
        : <Redirect to={AppRoute.ROOT} />}
    </Route>
  );
}

NoAuthRoute.propTypes = {
  children: PropTypes.element.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default NoAuthRoute;
