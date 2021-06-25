import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';
import {PROP_CITY, PROP_OFFER} from '../props';

export default function Map({city, activeOffer, offers}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const activeId = activeOffer && activeOffer.id;

  const defaultIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  const activeIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const isActive = offer.id === activeId;
        const icon = isActive
          ? activeIcon
          : defaultIcon;
        const {latitude: lat, longitude: lng} = offer.location;
        leaflet
          .marker({lat, lng}, {icon})
          .addTo(map);
      });
    }
  }, [activeId, activeIcon, defaultIcon, map, offers]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

Map.propTypes = {
  activeOffer: PROP_OFFER,
  city: PROP_CITY.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER),
};
