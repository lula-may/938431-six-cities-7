import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {getRatingStyle} from '../../utils.js';

export default function Rating({children, parentClass, rating}) {
  const ratingStyle = useMemo(() => getRatingStyle(rating), [rating]);

  return (
    <div className={`${parentClass}__rating rating`}>
      <div className={`${parentClass}__stars rating__stars`}>
        <span style={ratingStyle}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}

Rating.propTypes = {
  children: PropTypes.element,
  parentClass: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
