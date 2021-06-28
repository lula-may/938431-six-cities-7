import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import {PROP_OFFER} from '../props';
import {AppRoute, CardType} from '../../const';
import {cn} from '../../utils.js';

function OfferCard(props) {
  const {
    children,
    className,
    offer,
    onCardEnter,
    onCardLeave,
    onFavoriteButtonClick,
    renderPremiumMark,
    type: cardType,
  } = props;

  const {
    id,
    isFavorite,
    isPremium,
    price,
    rating,
    title,
    type,
  } = offer;

  const imageWrapperClassName = cn(`${cardType}__image-wrapper`, 'place-card__image-wrapper');
  const isCitiesType = cardType === CardType.CITIES;
  const infoClassName = cn( !isCitiesType && `${cardType}__info`,'place-card__info');
  const placeRoot = `${AppRoute.ROOM}/${id}`;
  const handleMouseEnter = useCallback(() => onCardEnter && onCardEnter(offer), [onCardEnter, offer]);

  return (
    <article
      className={cn(className, 'place-card')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onCardLeave}
    >
      {renderPremiumMark && renderPremiumMark(isPremium)}
      <div className={imageWrapperClassName}>
        <Link to={placeRoot}>
          {children}
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            className={cn(
              'place-card__bookmark-button',
              isFavorite && 'place-card__bookmark-button--active',
              'button',
            )}
            onClick={onFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
          </BookmarkButton>
        </div>
        <Rating rating={rating} />
        <h2 className="place-card__name">
          <Link to={placeRoot}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

OfferCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  offer: PROP_OFFER.isRequired,
  onCardEnter: PropTypes.func,
  onCardLeave: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  renderPremiumMark: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default OfferCard;
