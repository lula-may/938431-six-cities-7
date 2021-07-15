import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user/selectors';

function PrivateRoute({children, path, exact}) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      path={path}
      exact={exact}
    >
      {authorizationStatus === AuthorizationStatus.AUTH ? children : <Redirect to={AppRoute.LOGIN} />}
    </Route>
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
