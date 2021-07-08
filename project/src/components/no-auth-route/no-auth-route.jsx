import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';

function NoAuthRoute({children, path, exact, authorizationStatus}) {
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
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {NoAuthRoute};

export default connect(mapStateToProps)(NoAuthRoute);
