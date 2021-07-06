import PropTypes from 'prop-types';

const PROP_LOCATION = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
});

const PROP_CITY = PropTypes.shape({
  id: PropTypes.number,
  location: PROP_LOCATION.isRequired,
  name: PropTypes.string.isRequired,
});

const PROP_HOST = PropTypes.shape({
  avatarUrl: PropTypes.string.isRequired,
  email: PropTypes.string,
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
});

const PROP_OFFER = PropTypes.shape({
  bedrooms: PropTypes.number.isRequired,
  city: PROP_CITY,
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PROP_HOST,
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  location: PROP_LOCATION,
  maxAdults: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

const PROP_COMMENT = PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: PROP_HOST,
});

export {PROP_CITY, PROP_COMMENT, PROP_HOST, PROP_LOCATION, PROP_OFFER};
