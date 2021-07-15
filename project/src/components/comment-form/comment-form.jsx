import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {MAX_COMMENT_LENGTH, MAX_RATING, MIN_COMMENT_LENGTH, RATINGS} from '../../const';
import {getUploadingStatus, getUploadingError} from '../../store/comments/selectors';
import {postComment} from '../../store/comments/api-actions';

const isFormValid = (rating, text) => (text.length >= MIN_COMMENT_LENGTH) && (text.length <= MAX_COMMENT_LENGTH) && rating;

function CommentForm() {
  const isUploading = useSelector(getUploadingStatus);
  const isError = useSelector(getUploadingError);
  const dispatch = useDispatch();
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
    const newRating = Number(target.value);
    setRating(newRating);
    setIsButtonDisabled(!isFormValid(newRating, comment));
  }, [comment]);

  const handleReviewTextChange = useCallback(({target}) => {
    const commentText = target.value;
    setComment(commentText);
    setIsButtonDisabled(!isFormValid(rating, commentText));
  }, [rating]);

  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    const trimmedComment = comment.trim();
    if (!isFormValid(rating, trimmedComment)) {
      setComment(trimmedComment);
      setIsButtonDisabled(true);
      return;
    }
    dispatch(postComment({comment: trimmedComment, rating}));
    setIsButtonDisabled(true);
  }, [dispatch, comment, rating]);

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

export default CommentForm;
