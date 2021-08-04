import * as Redux from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {useOnAuthChange} from './use-on-auth-change';
import {AuthorizationStatus} from '../const';


describe('Hook: useOnAuthChange', () => {
  it('should dispatch actions on user authorization status has changed', () => {
    jest.spyOn(Redux, 'useSelector')
      .mockReturnValueOnce(AuthorizationStatus.NO_AUTH)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(AuthorizationStatus.AUTH)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(AuthorizationStatus.AUTH)
      .mockReturnValueOnce(true);

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);


    renderHook(() => useOnAuthChange());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
