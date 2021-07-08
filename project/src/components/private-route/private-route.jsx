import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';

function PrivateRoute({children, path, exact, authorizationStatus}) {
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
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
