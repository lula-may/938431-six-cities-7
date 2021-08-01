import React from 'react';

import Rating from '../rating/rating';
import {DATETIME_LENGTH} from '../../const';
import {formatDate} from '../../utils';
import {Prop} from '../props';

export default function Comment({comment}) {
  const {
    comment: text,
    date,
    rating,
    user: {avatarUrl, name},
  } = comment;

  const commentDate = formatDate(new Date(date));
  const dateTimeAttr = date.slice(0, DATETIME_LENGTH);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <Rating rating={rating} parentClass="reviews"/>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={dateTimeAttr}>{commentDate}</time>
      </div>
    </li>
  );
}

Comment.propTypes = {
  comment: Prop.COMMENT.isRequired,
};
