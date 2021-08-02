import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import useMap from './use-map.js';

const fakeLeaflet = {
  map: () => ({
    really: 'exist',
    panTo: () => {},
    setZoom: () => {},
  }),
  tileLayer: () => ({ addTo: () => {} }),
};

jest.mock('leaflet', () => fakeLeaflet);

describe('Hook: useMap', () => {
  it('should return null when mockRef.current === null', () => {
    const mockRef = {current: null};
    const city = {
      name: 'Amsterdam',
      id: 1,
      location: {latitude: 5, longitude: 5, zoom: 5},
    };

    const {result} = renderHook(() => useMap(mockRef, city));
    const map = result.current;

    expect(map).toBeNull();
  });

  it('should return Object (mockRef.current !== null)', () => {
    const mockRef = {
      current: (<div id='map'/>),
    };
    const city = {
      name: 'Amsterdam',
      id: 1,
      location: {latitude: 5, longitude: 5, zoom: 5},
    };

    const {result} = renderHook(() => useMap(mockRef, city));
    const map = result.current;

    expect(map).toBeInstanceOf(Object);
    expect(map.really).toEqual('exist');
  });
});
