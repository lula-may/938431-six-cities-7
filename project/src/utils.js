const getUniqueItems = (items) => items.filter((el, i, els) => els.indexOf(el) === i);

const getFavoriteOffers = (offers) => offers.filter(({isFavorite}) => isFavorite);

export {getFavoriteOffers, getUniqueItems};
