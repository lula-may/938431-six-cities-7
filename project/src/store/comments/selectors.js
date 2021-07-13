import {createSelector} from 'reselect';
import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.COMMENTS;

const getComments = (state) => state[NAME_SPACE].comments;

const getCommentsLoadingError = (state) => state[NAME_SPACE].isError;

const getCommentsLoadingStatus = (state) => state[NAME_SPACE].isLoading;

const isComment = createSelector(
  getComments,
  (comments) => Boolean(comments.length),
);

export {isComment, getComments, getCommentsLoadingError, getCommentsLoadingStatus};
