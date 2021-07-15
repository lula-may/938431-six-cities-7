import React from 'react';
import {useSelector} from 'react-redux';

import BookmarkButton from '../bookmark-button/bookmark-button.jsx';
import Map from '../map/map.jsx';
import Reviews from '../reviews/reviews.jsx';
import {cn, getRatingStyle} from '../../utils.js';
import { getNearOffers } from '../../store/nearby/selectors.js';
import {getCurrentRoom} from '../../store/room/selectors.js';

function RoomProperty(props) {
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

  const ratingStyle = getRatingStyle(rating);
  const hostProClass = isPro ? 'property__avatar-wrapper--pro' : '';
  const offers = [offer, ...nearOffers];

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
              className={cn(
                'property__bookmark-button',
                isFavorite && 'property__bookmark-button--active',
                'button')}
              onClick={() => {}}
            >
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
            </BookmarkButton>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={ratingStyle}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>
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
              <div className={`property__avatar-wrapper ${hostProClass}  user__avatar-wrapper`}>
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
