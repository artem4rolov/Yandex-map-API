import React, { useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import styles from "./PlaceOnMap.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setPoint } from "../../redux/slices/locationsSlice";

const PlaceOnMap = () => {
  const defaultState = {
    center: [55.320255, 58.769415],
    zoom: 6,
    controls: ["zoomControl", "fullscreenControl"],
  };

  const dispatch = useDispatch();

  const { points } = useSelector((state) => state.points);
  const { currentPoint, currentAddress } = useSelector((state) => state.points);

  const map = useRef();

  // функция для позиционирования карты по координатам
  const myPanTo = (coordinates, address) => {
    // если тыкаем на значок на карте, задаем новую локацию и адрес в store
    dispatch(setPoint(coordinates));
    dispatch(setAddress(address));
    // предварительно проверяем, что координаты есть
    // в противном случае показываем дефолтную точку из defaultState
    if (coordinates) {
      map.current.panTo(coordinates);
    }
  };

  // при получении координат точки - позиционируем карту на эту точку
  React.useEffect(() => {
    if (currentPoint && currentAddress) {
      myPanTo(currentPoint, currentAddress);
    }
  }, [currentPoint]);

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
                  myPanTo([latitude, longitude], address);
                }}
              />
            );
          })}
      </Map>
    </YMaps>
  );
};

export default PlaceOnMap;
