import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { AuthorizationStatus } from '../const';
import { resetOffers } from '../store/favorite/actions';
import { fetchFavoriteList } from '../store/favorite/api-actions';
import { fetchOfferList } from '../store/offers/api-actions';
import { getAuthorizationStatus, selectIsAuthorized} from '../store/user/selectors';

export function useOnAuthChange() {
  const [auth, setIsAuth] = useState(AuthorizationStatus.UNKNOWN);
  const currentAuth = useSelector(getAuthorizationStatus);
  const isAuthorized = useSelector(selectIsAuthorized);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth !== currentAuth) {
      dispatch(fetchOfferList());
      isAuthorized ? dispatch(fetchFavoriteList()) : dispatch(resetOffers());
      setIsAuth(currentAuth);
    }
  }, [auth, currentAuth, dispatch, isAuthorized]);
}
