import {useDispatch} from 'react-redux';
import {postOffer} from '../store/favorite/api-actions';

export const useAddToFavorite = (offer) => {
  const dispatch = useDispatch();

  const onFavoriteButtonClick = () => {
    dispatch(postOffer(offer));
  };
  return onFavoriteButtonClick;
};
