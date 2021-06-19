const getUniqueItems = (items) => items.filter((el, i, els) => els.indexOf(el) === i);

const getFavoriteOffers = (offers) => offers.filter(({isFavorite}) => isFavorite);

const getRatingStyle = (rating) => ({width: `${Math.round(rating) * 20}%`});

export {getFavoriteOffers, getRatingStyle, getUniqueItems};
