import {renderHook, act} from '@testing-library/react-hooks';
import * as Redux from 'react-redux';
import { useAddToFavorite } from './use-add-to-favorite';

let mockOffer = null;

describe('Hook: useAddToFavorite', () => {
  beforeAll(() => {
    mockOffer = {
      id: 5,
      description: 'description',
      price: 100,
    };
  });

  it('should return function', () => {
    const dispatch = jest.fn(() => {});
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    const {result} = renderHook(() => useAddToFavorite(mockOffer));

    expect(result.current).toBeInstanceOf(Function);
  });

  it('should call dispatch on returned callback invoke', () => {
    const dispatch = jest.fn((...args) => [...args]);
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    const {result} = renderHook(() => useAddToFavorite(mockOffer));
    const handleFavoriteButtonClick = result.current;
    act(() => handleFavoriteButtonClick());

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
