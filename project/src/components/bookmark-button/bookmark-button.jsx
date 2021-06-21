import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

export default function BookmarkButton({isFavorite, onFavoriteClick}) {
  const favoriteActiveClass = isFavorite ? ' place-card__bookmark-button--active' : '';
  const handleButtonClick = useCallback(() => onFavoriteClick(!isFavorite), [onFavoriteClick, isFavorite]);
  return (
    <button className={`place-card__bookmark-button ${favoriteActiveClass} button`} type="button"
      onClick={handleButtonClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

BookmarkButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};
