import React, { useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import styles from "./PlaceOnMap.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setPoint } from "../../redux/slices/locationsSlice";

const PlaceOnMap = () => {
  const dispatch = useDispatch();

  const { points, currentPoint, currentAddress, filterCoordinates } =
    useSelector((state) => state.points);

  const map = useRef();

  let defaultState = {
    center: [55.320255, 58.769415],
    zoom: 6,
    controls: ["zoomControl", "fullscreenControl"],
  };

  // функция для позиционирования карты по координатам
  const myPanTo = (coordinates, address) => {
    // если тыкаем на значок на карте, задаем новую локацию и адрес в store
    dispatch(setPoint(coordinates));
    dispatch(setAddress(address));
    // предварительно проверяем, что координаты есть
    // в противном случае показываем дефолтную точку из defaultState
    if (coordinates) {
      map.current.setZoom(14, { duration: 2000 });
      map.current.panTo(coordinates);
    }
  };

  // при получении координат точки - позиционируем карту на эту точку
  React.useEffect(() => {
    if (currentPoint && currentAddress) {
      myPanTo(currentPoint, currentAddress);
    }
  }, [currentPoint]);

  // если выбран город из списка - позиционируем карту на город
  React.useEffect(() => {
    if (filterCoordinates) {
      map.current.setZoom(12, { duration: 2000 });
      map.current.panTo(filterCoordinates);
      // если город не выбран - отдаляем карту на все города (которые доступны в тестовом задании)
    } else if (map.current) {
      map.current.setZoom(6, { duration: 2000 });
      map.current.panTo([55.320255, 58.769415], null);
    }
  }, [filterCoordinates]);

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
                  iconCaption: address,
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
