import {SortType} from './const';

const getUniqueItems = (items) => items.filter((el, i, els) => els.indexOf(el) === i);

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

const updateElements = (element, elements) => {
  const index = elements.findIndex(({id}) => id === element.id);
  if (index === -1) {
    elements.push(element);
    return elements;
  }
  return [...elements.slice(0, index), ...elements.slice(index + 1)];
};

const replaceElement = (element, elements) => {
  const index = elements.findIndex(({id}) => id === element.id);
  if (index === -1) {
    return elements;
  }
  return [...elements.slice(0, index), element, ...elements.slice(index + 1)];
};

export {cn, getRatingStyle, getUniqueItems, formatDate, replaceElement, sortOffersByType, updateElements};
