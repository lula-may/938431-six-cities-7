import {SortType} from './const';

const getUniqueItems = (items) => items.filter((el, i, els) => els.indexOf(el) === i);

const filterOffersByCity = (cityName, offers) => offers.filter(({city}) => city.name === cityName);

const getRatingStyle = (rating) => ({width: `${Math.round(rating) * 20}%`});

const formatDate = (date) => {
  if (date instanceof Date) {
    return date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
  }
};

const cn = (...args) => args.filter(Boolean).join(' ');

const sortOffersByType = (offers, type) => {
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

// Удаляет предложение из списка, если оно там есть, вставляет в список - если нет
const updateOffersList = (offer, offers) => {
  const index = offers.findIndex(({id}) => id === offer.id);
  if (index === -1) {
    return [...offers, offer];
  }
  return [...offers.slice(0, index), ...offers.slice(index + 1)];
};

// Заменяет предложение в списке на новое с таким же id. Возвращает массив из двух значений: список предложений и признак был список обновлен или нет.
const replaceOffer = (offer, offers) => {
  const index = offers.findIndex(({id}) => id === offer.id);
  if (index === -1) {
    return [offers, false];
  }
  const updatedOffers = [...offers.slice(0, index), offer, ...offers.slice(index + 1)];
  return [updatedOffers, true];
};

export {cn, getRatingStyle, getUniqueItems, filterOffersByCity, formatDate, replaceOffer, sortOffersByType, updateOffersList};
