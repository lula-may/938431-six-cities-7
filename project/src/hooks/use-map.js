import {useEffect, useState} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

function useMap(mapRef, city) {
  const {location} = city;
  const {latitude: lat, longitude: lng, zoom} = location;
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat,
          lng,
        },
        zoom,
        zoomControl: false,
        marker: true,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            minZoom: 11,
            maxZoom: 13,
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, lat, lng, zoom]);

  useEffect(() => {
    if (map) {
      map.panTo({lat, lng});
      map.setZoom(zoom);
    }
  }, [lat, lng, map, zoom]);

  return map;
}

export default useMap;
