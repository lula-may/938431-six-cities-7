import React from 'react';
import PropTypes from 'prop-types';

import {cn} from '../../utils';

export default function BookmarkButton({buttonClassName, children, isFavorite, onClick}) {
  const className = cn(buttonClassName, isFavorite && `${buttonClassName}--active`, 'button');
  return (
    <button
      className={className}
      onClick={onClick}
      type="button"
    >
      {children}
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

BookmarkButton.propTypes = {
  buttonClassName: PropTypes.string.isRequired,
  children: PropTypes.node,
  isFavorite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
