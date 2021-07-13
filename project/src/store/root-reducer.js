import {combineReducers} from 'redux';
import {reducer as offersReducer} from './offers/reducer';
import {reducer as userReducer} from './user/reducer';
import {reducer as roomReducer} from './room/reducer';
import {reducer as commentsReducer} from './comments/reducer';
import { reducer as nearOffersReducer } from './nearby/reducer';

export const NameSpace = {
  COMMENTS: 'COMMENTS',
  NEAR_OFFERS: 'NEAR_OFFERS',
  OFFERS: 'OFFERS',
  USER: 'USER',
  ROOM: 'ROOM',
};

export default combineReducers({
  [NameSpace.OFFERS]: offersReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.ROOM]: roomReducer,
  [NameSpace.COMMENTS]: commentsReducer,
  [NameSpace.NEAR_OFFERS]: nearOffersReducer,
});
