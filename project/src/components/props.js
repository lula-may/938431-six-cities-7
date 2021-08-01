import PropTypes from 'prop-types';

const LOCATION = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
});

const CITY = PropTypes.shape({
  id: PropTypes.number,
  location: LOCATION.isRequired,
  name: PropTypes.string.isRequired,
});

const HOST = PropTypes.shape({
  avatarUrl: PropTypes.string.isRequired,
  email: PropTypes.string,
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
});

const OFFER = PropTypes.shape({
  bedrooms: PropTypes.number.isRequired,
  city: CITY,
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: HOST,
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  location: LOCATION,
  maxAdults: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

const COMMENT = PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: HOST,
});

const Prop = {
  CITY,
  COMMENT,
  HOST,
  LOCATION,
  OFFER,
};

export {Prop};
