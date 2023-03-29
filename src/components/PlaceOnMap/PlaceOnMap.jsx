import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import styles from "./PlaceOnMap.module.scss";

const PlaceOnMap = ({ coordinates }) => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 9,
    controls: ["zoomControl", "fullscreenControl"],
  };

  console.log(coordinates);

  return (
    <YMaps>
      <Map
        className={styles.mapContainer}
        defaultState={defaultState}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
      >
        <Placemark
          geometry={coordinates}
          properties={{
            balloonContentBody:
              "This is balloon loaded by the Yandex.Maps API module system",
          }}
        />
      </Map>
    </YMaps>
  );
};

export default PlaceOnMap;
