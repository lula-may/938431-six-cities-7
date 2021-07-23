import React, {useCallback, useMemo} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {AppRoute} from '../../const';
import {cn} from '../../utils';
import {selectIsAuthorized} from '../../store/user/selectors';

export default function BookmarkButton({buttonClassName, children, isFavorite, onClick}) {
  const isAuthorized = useSelector(selectIsAuthorized);
  const history = useHistory();
  const className = useMemo(() => cn(buttonClassName, isFavorite && `${buttonClassName}--active`, 'button'), [buttonClassName, isFavorite]);

  const handleClick = useCallback(() => isAuthorized ? onClick() : history.push(AppRoute.LOGIN), [history, isAuthorized, onClick]);

  return (
    <button
      className={className}
      onClick={handleClick}
      type="button"
    >
      {children}
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

BookmarkButton.propTypes = {
  buttonClassName: PropTypes.string.isRequired,
  children: PropTypes.node,
  isFavorite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
