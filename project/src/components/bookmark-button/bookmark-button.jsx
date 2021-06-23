import React from 'react';
import PropTypes from 'prop-types';

export default function BookmarkButton({children, className, onClick}) {
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
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
