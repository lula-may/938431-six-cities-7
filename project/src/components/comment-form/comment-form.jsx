import React, {Fragment, useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import {MAX_RATING, RATINGS} from '../../const';

export default function CommentForm({onSubmit}) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const handleRatingChange = useCallback(({target}) => setRating(target.value), [setRating]);
  const handleReviewTextChange = useCallback(({target}) => setComment(target.value), [setComment]);
  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    onSubmit({rating, comment});
    setRating('');
    setComment('');
  }, [onSubmit, comment, rating]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((value, i) => {
          const currentRating = MAX_RATING - i;
          const isChecked = currentRating.toString() === rating;
          return (
            <Fragment key={value}>
              <input className="form__rating-input visually-hidden" name="rating" value={currentRating} id={`${currentRating}-stars`} type="radio"
                checked={isChecked}
                onChange={handleRatingChange}
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
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleReviewTextChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
