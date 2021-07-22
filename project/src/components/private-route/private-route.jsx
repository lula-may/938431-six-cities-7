import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute} from '../../const';
import {selectIsAuthorized} from '../../store/user/selectors';

function PrivateRoute({children, path, exact}) {
  const isAuthorized = useSelector(selectIsAuthorized);

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
