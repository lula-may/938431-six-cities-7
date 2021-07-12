import {combineReducers} from 'redux';
import {reducer as offersReducer} from './offers/reducer';
import {reducer as userReducer} from './user/reducer';

export const NameSpace = {
  OFFERS: 'OFFERS',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.OFFERS]: offersReducer,
  [NameSpace.USER]: userReducer,
});
