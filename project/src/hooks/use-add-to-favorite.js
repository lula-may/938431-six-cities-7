import { useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {postOffer} from '../store/favorite/api-actions';

export const useAddToFavorite = (offer) => {
  const dispatch = useDispatch();

  const onFavoriteButtonClick = useCallback(() => {
    dispatch(postOffer(offer));
  }, [dispatch, offer]);

  return onFavoriteButtonClick;
};
