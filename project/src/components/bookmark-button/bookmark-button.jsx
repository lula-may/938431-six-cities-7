import React, {useCallback, useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {AppRoute, AuthorizationStatus} from '../../const';
import {cn} from '../../utils';
import { getAuthorizationStatus } from '../../store/user/selectors';

export default function BookmarkButton({buttonClassName, children, isFavorite, onClick}) {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const [isActive, setIsActive] = useState(isFavorite);
  const history = useHistory();
  const className = useMemo(() => cn(buttonClassName, isActive && `${buttonClassName}--active`, 'button'), [buttonClassName, isActive]);

  const handleClick = useCallback(() => {
    if (!isAuthorized) {
      history.push(AppRoute.LOGIN);
    }
    onClick();
    setIsActive((prev) => !prev);
  }, [history, isAuthorized, onClick]);

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
