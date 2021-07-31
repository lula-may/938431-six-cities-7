import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/use-map';
import {PROP_CITY, PROP_OFFER} from '../props';
import {getClassName} from '../../utils.js';

const DEFAULT_ICON = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const ACTIVE_ICON = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

export default function Map({className, city, activeOffer, offers}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const activeId = activeOffer && activeOffer.id;
  const containerClass = getClassName(className, 'map');

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const isActive = offer.id === activeId;
        const icon = isActive
          ? ACTIVE_ICON
          : DEFAULT_ICON;
        const {latitude: lat, longitude: lng} = offer.location;
        leaflet
          .marker({lat, lng}, {icon})
          .addTo(map);
      });
    }
  }, [activeId, map, offers]);

  return (
    <section
      className={containerClass}
      ref={mapRef}
    >
    </section>
  );
}

Map.propTypes = {
  activeOffer: PROP_OFFER,
  className: PropTypes.string,
  city: PROP_CITY.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER),
};
