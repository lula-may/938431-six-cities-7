const getUniqueItems = (items) => items.filter((el, i, els) => els.indexOf(el) === i);

const getFavoriteOffers = (offers) => offers.filter(({isFavorite}) => isFavorite);

const getRatingStyle = (rating) => ({width: `${Math.round(rating) * 20}%`});

const formatDate = (date) => {
  if (date instanceof Date) {
    return date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
  }
};

const getElementById = (elements, elementId) => elements.find(({id}) => id === elementId);

const cn = (...args) => args.join(' ');
export {cn, getElementById, getFavoriteOffers, getRatingStyle, getUniqueItems, formatDate};
