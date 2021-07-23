import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute} from '../../const';
import {selectIsAuthorized} from '../../store/user/selectors';

function NoAuthRoute({children, path, exact}) {
  const isAuthorized = useSelector(selectIsAuthorized);

  return (
    <Route
      path={path}
      exact={exact}
    >
      {isAuthorized
        ? <Redirect to={AppRoute.ROOT} />
        : children}
    </Route>
  );
}

NoAuthRoute.propTypes = {
  children: PropTypes.element.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default NoAuthRoute;
