import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.ROOM;

const getCurrentRoom = (state) => state[NAME_SPACE].room;

const getRoomLoadingError = (state) => state[NAME_SPACE].isError;

const getRoomLoadingStatus = (state) => state[NAME_SPACE].isLoading;

const getRoomNotFound = (state) => state[NAME_SPACE].isNotFound;

export {getCurrentRoom, getRoomLoadingError, getRoomLoadingStatus, getRoomNotFound};
