import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import {PROP_OFFER} from '../props';
import {AppRoute, CardType} from '../../const';
import {getClassName} from '../../utils.js';
import {useAddToFavorite} from '../../hooks/use-add-to-favorite';

function OfferCard(props) {
  const {
    className,
    imageHeight,
    imageWidth,
    isPremiumShown,
    offer,
    onCardEnter,
    onCardLeave,
    type: cardType,
  } = props;

  const {
    id,
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const imageWrapperClassName = getClassName(`${cardType}__image-wrapper`, 'place-card__image-wrapper');
  const isCitiesType = cardType === CardType.CITIES;
  const infoClassName = getClassName( !isCitiesType && `${cardType}__info`,'place-card__info');
  const placeRoot = `${AppRoute.ROOM}/${id}`;

  const handleMouseEnter = useCallback(() => onCardEnter && onCardEnter(offer), [onCardEnter, offer]);
  const onFavoriteButtonClick = useAddToFavorite(offer);

  return (
    <article
      className={getClassName(className, 'place-card')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onCardLeave}
    >
      {isPremiumShown && isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={imageWrapperClassName}>
        <Link to={placeRoot}>
          <img className="place-card__image" src={previewImage} width={imageWidth} height={imageHeight} alt="Place"/>
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            buttonClassName="place-card__bookmark-button"
            isFavorite={isFavorite}
            onClick={onFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
          </BookmarkButton>
        </div>
        <Rating rating={rating} parentClass="place-card"/>
        <h2 className="place-card__name">
          <Link to={placeRoot}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

OfferCard.propTypes = {
  className: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageWidth: PropTypes.number.isRequired,
  isPremiumShown: PropTypes.bool.isRequired,
  offer: PROP_OFFER.isRequired,
  onCardEnter: PropTypes.func,
  onCardLeave: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default OfferCard;
