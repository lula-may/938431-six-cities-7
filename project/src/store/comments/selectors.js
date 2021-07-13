import {createSelector} from 'reselect';
import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.COMMENTS;

const getAllComments = (state) => state[NAME_SPACE].comments;

const getCommentsLoadingError = (state) => state[NAME_SPACE].isError;

const getCommentsLoadingStatus = (state) => state[NAME_SPACE].isLoading;

const selectComments = createSelector(
  getAllComments,
  (comments) => ([...comments].sort((right, left) => {
    const diff = new Date(left.date) - new Date(right.date);
    return diff;
  }).slice(0, 10)),
);
const getCommentsCount = createSelector(
  getAllComments,
  (comments) => comments.length,
);
export {selectComments, getCommentsCount, getCommentsLoadingError, getCommentsLoadingStatus};
