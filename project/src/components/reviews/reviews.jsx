import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '../comment/comment.jsx';
import CommentForm from '../comment-form/comment-form.jsx';
import Spinner from '../spinner/spinner.jsx';
import {AuthorizationStatus} from '../../const.js';
import {getAuthorizationStatus} from '../../store/user/selectors.js';
import {selectComments, getCommentsLoadingError, getCommentsLoadingStatus, getCommentsCount} from '../../store/comments/selectors.js';
import {PROP_COMMENT} from '../props.js';

function Reviews({authorizationStatus, comments, commentsCount, isError, isLoading}) {
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
      {isAuthorized && <CommentForm onSubmit={() => {}} />}
    </section>
  );
}

Reviews.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PROP_COMMENT).isRequired,
  commentsCount: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  comments: selectComments(state),
  commentsCount: getCommentsCount(state),
  isError: getCommentsLoadingError(state),
  isLoading: getCommentsLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCommentFormSubmit: () => {},
});

export {Reviews};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
