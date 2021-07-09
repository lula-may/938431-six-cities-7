import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';

function NoAuthRoute({render, path, exact, authorizationStatus}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        authorizationStatus !== AuthorizationStatus.AUTH
          ? render()
          : <Redirect to={AppRoute.ROOT} />
      )}
    />
  );
}

NoAuthRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {NoAuthRoute};

export default connect(mapStateToProps)(NoAuthRoute);
