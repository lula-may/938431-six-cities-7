import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {MAX_COMMENT_LENGTH, MAX_RATING, MIN_COMMENT_LENGTH, RATINGS} from '../../const';
import {getUploadingStatus, getUploadingError} from '../../store/comments/selectors';
import {postComment} from '../../store/comments/api-actions';

const isFormValid = (rating, text) => (text.length >= MIN_COMMENT_LENGTH) && (text.length <= MAX_COMMENT_LENGTH) && rating;

function CommentForm({onSubmit, isError, isUploading}) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!(isError || isUploading)) {
      setRating('');
      setComment('');
    }
    if (isError) {
      setIsButtonDisabled(false);
    }
  }, [isError, isUploading]);

  const handleRatingChange = useCallback(({target}) => {
    setRating(Number(target.value));
    setIsButtonDisabled(!isFormValid(rating, comment));
  }, [comment, rating]);

  const handleReviewTextChange = useCallback(({target}) => {
    setComment(target.value);
    setIsButtonDisabled(!isFormValid(rating, comment));
  }, [comment, rating]);

  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    onSubmit({comment, rating});
    setIsButtonDisabled(true);
  }, [onSubmit, comment, rating]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      {isError &&
        <p className="reviews__label" style={{display: 'block', color: 'red'}}>Sorry, something went wrong. Your comment wasn&prime;t sent.</p>}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((value, i) => {
          const currentRating = MAX_RATING - i;
          const isChecked = currentRating === rating;
          return (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={currentRating}
                id={`${currentRating}-stars`}
                type="radio"
                checked={isChecked}
                onChange={handleRatingChange}
                disabled={isUploading}
              />
              <label htmlFor={`${currentRating}-stars`} className="reviews__rating-label form__rating-label" title={value}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        minLength="50"
        maxLength="300"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleReviewTextChange}
        disabled={isUploading}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  isError: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isUploading: getUploadingStatus(state),
  isError: getUploadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (comment) => dispatch(postComment(comment)),
});

export {CommentForm};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
