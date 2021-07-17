import {combineReducers} from 'redux';
import {reducer as commentsReducer} from './comments/reducer';
import {reducer as favoriteReducer} from './favorite/reducer';
import { reducer as nearOffersReducer } from './nearby/reducer';
import {reducer as offersReducer} from './offers/reducer';
import {reducer as roomReducer} from './room/reducer';
import {reducer as userReducer} from './user/reducer';

export const NameSpace = {
  COMMENTS: 'COMMENTS',
  FAVORITE: 'FAVORITE',
  NEAR_OFFERS: 'NEAR_OFFERS',
  OFFERS: 'OFFERS',
  USER: 'USER',
  ROOM: 'ROOM',
};

export default combineReducers({
  [NameSpace.COMMENTS]: commentsReducer,
  [NameSpace.FAVORITE]: favoriteReducer,
  [NameSpace.NEAR_OFFERS]: nearOffersReducer,
  [NameSpace.OFFERS]: offersReducer,
  [NameSpace.ROOM]: roomReducer,
  [NameSpace.USER]: userReducer,
});
