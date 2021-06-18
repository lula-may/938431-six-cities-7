import PropTypes from 'prop-types';

const propLocation = PropTypes.shape({
  'latitude': PropTypes.number.isRequired,
  'longitude': PropTypes.number.isRequired,
  'zoom': PropTypes.number.isRequired,
}).isRequired;

const propCity = PropTypes.shape({
  'city': propLocation,
  'name': PropTypes.string.isRequired,
});

const propHost = PropTypes.shape({
  'avatarUrl': PropTypes.string.isRequired,
  'id': PropTypes.number.isRequired,
  'isPro': PropTypes.bool.isRequired,
  'name': PropTypes.string.isRequired,
});

const propOffer = PropTypes.shape({
  'bedrooms': PropTypes.number.isRequired,
  'city': propCity,
  'description': PropTypes.string.isRequired,
  'goods': PropTypes.arrayOf(PropTypes.string).isRequired,
  'host': propHost,
  'id': PropTypes.number.isRequired,
  'images': PropTypes.arrayOf(PropTypes.string).isRequired,
  'isFavorite': PropTypes.bool.isRequired,
  'isPremium': PropTypes.bool.isRequired,
  'location': propLocation,
  'maxAdults': PropTypes.number.isRequired,
  'previewImage': PropTypes.string.isRequired,
  'price': PropTypes.number.isRequired,
  'rating': PropTypes.number.isRequired,
  'title': PropTypes.string.isRequired,
  'type': PropTypes.string.isRequired,
}).isRequired;

export {propCity, propHost, propLocation, propOffer};
