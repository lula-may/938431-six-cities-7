import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {MAX_COMMENT_LENGTH, MAX_RATING, MIN_COMMENT_LENGTH, RATINGS} from '../../const';
import {getUploadingStatus, getUploadingError} from '../../store/comments/selectors';
import {postComment} from '../../store/comments/api-actions';

const ERROR_STYLE = {border: '2px solid red'};
const isCommentTextValid = (text) => (text.length >= MIN_COMMENT_LENGTH) && (text.length <= MAX_COMMENT_LENGTH);

const getFormErrors = (data) => ({
  text: !isCommentTextValid(data.comment) ? 'Comment should be at least 50 characters' : undefined,
  rating: !data.rating ? 'Rating is not set' : undefined,
});

const isFormValid = (data) => {
  const errors = getFormErrors(data);
  return Object.values(errors).every((err) => !err);
};

function CommentForm() {
  const isUploading = useSelector(getUploadingStatus);
  const isError = useSelector(getUploadingError);
  const dispatch = useDispatch();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  // isValidForm отвечает за состояние кнопки: disabled
  const [isValidForm, setIsValidForm] = useState(false);

  // isInvalidOnSubmit - отвечает за появление красной рамки у textarea
  // Пока пользователь только начинает печатать, красной рамки нет
  // При попытке отправить форму, удаляются пробелы в начале и в конце текста
  // форма может стать невалидной, тогда и появляется красная рамка
  const [isInvalidOnSubmit, setIsInvalidOnSubmit] = useState(false);

  const errorStyle = useMemo(() => isInvalidOnSubmit ? ERROR_STYLE : null, [isInvalidOnSubmit]);

  useEffect(() => {
    const isValid = isFormValid({comment, rating});
    if (isValid !== isValidForm) {
      setIsValidForm(isValid);
      isValid && setIsInvalidOnSubmit(false);
    }
  }, [comment, isValidForm, rating]);

  useEffect(() => {
    if (!isError && !isUploading) {
      setRating('');
      setComment('');
    }
  }, [isError, isUploading]);

  const handleRatingChange = useCallback(({target}) => {
    const newRating = Number(target.value);
    setRating(newRating);
  }, []);

  const handleReviewTextChange = useCallback(({target}) => {
    const commentText = target.value;
    setComment(commentText);
  }, []);

  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    const trimmedComment = comment.trim();
    if (!isFormValid({rating, comment: trimmedComment})) {
      setComment(trimmedComment);
      setIsInvalidOnSubmit(true);
      return;
    }
    dispatch(postComment({comment: trimmedComment, rating}));
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
        style={errorStyle}
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
          disabled={!isValidForm || isUploading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
