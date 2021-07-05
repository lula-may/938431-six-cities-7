export const AppRoute = {
  FAVORITES: '/favorites',
  LOGIN: '/login',
  ROOM: '/offer',
  ROOT: '/',
};

export const APIRoute = {
  OFFERS: '/hotels',
  FAVORITES: '/favorite',
  COMMENTS: '/comments',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const CardType = {
  CITIES: 'cities',
  NEAR_PLACES: 'near-places',
  FAVORITES: 'favorites',
};

export const ImageSize = {
  cities: [260, 200],
  favorites: [150, 110],
  'near-places': [260, 200],
};

export const SortType = {
  POPULAR: 'popular',
  PRICE_UP: 'priceUp',
  PRICE_DOWN: 'priceDown',
  RATING: 'rating',
};

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const DATETIME_LENGTH = 10;
export const MAX_RATING = 5;
export const RATINGS = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

