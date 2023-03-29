import React, { useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import styles from "./PlaceOnMap.module.scss";

const PlaceOnMap = ({ coordinates }) => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl"],
  };

  const map = useRef();

  const myPanTo = (coordinates) => {
    if (coordinates) {
      map.current.panTo(coordinates);
    }
  };

  // при получении координат точки - позиционируем карту на эту точку
  React.useEffect(() => {
    myPanTo(coordinates);
  }, [coordinates]);

  console.log(coordinates);

  return (
    <YMaps>
      <Map
        instanceRef={map}
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
      {/* <div className="myMenu">
        <ul>
          <li onClick={() => myPanTo([55.612392, 37.029242])}>Пункт 1</li>
          <li onClick={() => myPanTo([55.46989, 37.947974])}>Пункт 2</li>
          <li onClick={() => myPanTo([56.108996, 37.501654])}>Пункт 3</li>
        </ul>
      </div> */}
    </YMaps>
  );
};

export default PlaceOnMap;
