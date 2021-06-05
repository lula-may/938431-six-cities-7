import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

function App({offers, offersCount}) {
  return (
    <Main
      offers={offers}
      offersCount={offersCount}
    />
  );
}

App.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
  offersCount: PropTypes.number.isRequired,
};

export default App;
