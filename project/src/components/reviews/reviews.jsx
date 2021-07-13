import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {PROP_COMMENT} from '../props.js';
import Comment from '../comment/comment.jsx';
import CommentForm from '../comment-form/comment-form.jsx';
import {AuthorizationStatus} from '../../const.js';
import {getAuthorizationStatus} from '../../store/user/selectors.js';
import {getComments} from '../../store/comments/selectors.js';

function Reviews({authorizationStatus, comments}) {
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const commentsCount = comments.length;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsCount}</span></h2>
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
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCommentFormSubmit: () => {},
});

export {Reviews};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
