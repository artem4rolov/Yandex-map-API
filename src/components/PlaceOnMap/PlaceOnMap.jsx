import React, { useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import styles from "./PlaceOnMap.module.scss";
import { useSelector } from "react-redux";

const PlaceOnMap = ({ coordinates }) => {
  const defaultState = {
    center: [55.320255, 58.769415],
    zoom: 6,
    controls: ["zoomControl", "fullscreenControl"],
  };

  const { points } = useSelector((state) => state.points);

  const map = useRef();

  // функция для позиционирования карты по координатам
  const myPanTo = (coordinates) => {
    // предварительно проверяем, что координаты есть
    // в противном случае показываем дефолтную точку из defaultState
    if (coordinates) {
      map.current.panTo(coordinates);
      // map.current.
    }
  };

  // при получении координат точки - позиционируем карту на эту точку
  React.useEffect(() => {
    myPanTo(coordinates);
  }, [coordinates]);

  // console.log(coordinates);

  return (
    <YMaps>
      <Map
        instanceRef={map}
        className={styles.mapContainer}
        defaultState={defaultState}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
      >
        {points &&
          points.map((item) => {
            const { address, latitude, longitude } = item;

            return (
              <Placemark
                key={address}
                geometry={[latitude, longitude]}
                properties={{
                  balloonContentBody:
                    "This is balloon loaded by the Yandex.Maps API module system",
                }}
                onClick={() => {
                  console.log([latitude, longitude]);
                }}
              />
            );
          })}
      </Map>
    </YMaps>
  );
};

export default PlaceOnMap;
