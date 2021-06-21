import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {getRatingStyle} from '../../utils.js';

export default function Rating({rating}) {
  const ratingStyle = useMemo(() => getRatingStyle(rating), [rating]);

  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={ratingStyle}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};
