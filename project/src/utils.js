import {SortType} from './const';

const getUniqueItems = (items) => items.filter((el, i, els) => els.indexOf(el) === i);

const getFavoriteOffers = (offers) => offers.filter(({isFavorite}) => isFavorite);

const getRatingStyle = (rating) => ({width: `${Math.round(rating) * 20}%`});

const formatDate = (date) => {
  if (date instanceof Date) {
    return date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
  }
};

const getElementById = (elements, elementId) => elements.find(({id}) => id === elementId);

const getOffersByCity = (offers, cityName) => offers.filter(({city}) => city.name === cityName);

const getRestElements = (elements, element) => {
  const index = elements.findIndex(({id}) => id === element.id);
  if (index === -1) {
    return elements;
  }
  return [...elements.slice(0, index), ...elements.slice(index + 1)];
};

const cn = (...args) => args.filter(Boolean).join(' ');

const sortOffersByType = (type, offers) => {
  switch (type) {
    case SortType.PRICE_UP:
      return offers.slice().sort((left, right) => (left.price - right.price));

    case SortType.PRICE_DOWN:
      return offers.slice().sort((left, right) => (right.price - left.price));

    case SortType.RATING:
      return offers.slice().sort((left, right) => (right.rating - left.rating));

    default:
      return offers;
  }
};

export {cn, getElementById, getFavoriteOffers, getOffersByCity, getRatingStyle, getRestElements, getUniqueItems, formatDate, sortOffersByType};
