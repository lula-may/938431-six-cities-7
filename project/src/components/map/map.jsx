import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {PROP_CITY, PROP_OFFER} from '../props';

export default function Map({city, activePoint, points}) {
  const mapRef = useRef(null);


  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

Map.propTypes = {
  activePoint: PROP_OFFER.isRequired,
  city: PROP_CITY.isRequired,
  points: PropTypes.arrayOf(PROP_OFFER),
};
