import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';

import BookmarkButton from '../bookmark-button/bookmark-button.jsx';
import Map from '../map/map.jsx';
import Rating from '../rating/rating.jsx';
import Reviews from '../reviews/reviews.jsx';
import {cn} from '../../utils.js';
import {getNearOffers} from '../../store/nearby/selectors.js';
import {getCurrentRoom} from '../../store/room/selectors.js';
import {useAddToFavorite} from '../../hooks/use-add-to-favorite.js';

function RoomProperty() {
  const offer = useSelector(getCurrentRoom);
  const nearOffers = useSelector(getNearOffers);

  const {
    bedrooms,
    city,
    description,
    goods,
    host: {avatarUrl, isPro, name: hostName},
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = offer;
  const onFavoriteButtonClick = useAddToFavorite(offer);

  const hostClass = useMemo(() => cn('property__avatar-wrapper', isPro &&'property__avatar-wrapper--pro', 'user__avatar-wrapper'), [isPro]);

  const offers = useMemo(() => [offer, ...nearOffers], [nearOffers, offer]);

  return (
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {images.map((image) => (
            <div key={image} className="property__image-wrapper">
              <img className="property__image" src={image} alt="Studio"/>
            </div>
          ))}
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
          <div className="property__name-wrapper">
            <h1 className="property__name">{title}</h1>
            <BookmarkButton
              buttonClassName="property__bookmark-button"
              isFavorite={isFavorite}
              onClick={onFavoriteButtonClick}
            >
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
            </BookmarkButton>
          </div>
          <Rating
            parentClass="property"
            rating={rating}
          >
            <span className="property__rating-value rating__value">{rating}</span>
          </Rating>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">{type}</li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {goods.map((item) => (
                <li key={item} className="property__inside-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className={hostClass}>
                <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="property__user-name">
                {hostName}
              </span>
            </div>
            <div className="property__description">
              <p className="property__text">{description}</p>
            </div>
          </div>
          <Reviews />
        </div>
      </div>
      <Map
        activeOffer={offer}
        className="property__map"
        city={city}
        offers={offers}
      />
    </section>
  );
}

export default RoomProperty;
