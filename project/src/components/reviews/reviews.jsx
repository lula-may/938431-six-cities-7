import React from 'react';
import {useSelector} from 'react-redux';

import Comment from '../comment/comment.jsx';
import CommentForm from '../comment-form/comment-form.jsx';
import Spinner from '../spinner/spinner.jsx';
import {AuthorizationStatus} from '../../const.js';
import {getAuthorizationStatus} from '../../store/user/selectors.js';
import {selectComments, getCommentsLoadingError, getCommentsLoadingStatus, getCommentsCount} from '../../store/comments/selectors.js';

function Reviews() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const comments = useSelector(selectComments);
  const commentsCount = useSelector(getCommentsCount);
  const isError = useSelector(getCommentsLoadingError);
  const isLoading = useSelector(getCommentsLoadingStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsCount}</span></h2>
      {isLoading && <Spinner />}
      {isError && <p> We failed to load reviews. Please, try again later.</p>}
      <ul className="reviews__list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      {isAuthorized && <CommentForm />}
    </section>
  );
}

export default Reviews;
