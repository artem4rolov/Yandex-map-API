import React from "react";
import { useSelector } from "react-redux";
import LocationItem from "./LocationItem/LocationItem";

import styles from "./LocationList.module.scss";

const LocationList = () => {
  const { points, filterCoordinates } = useSelector((state) => state.points);

  // функция, которая проверяет массив кординат на идентичность
  // если координаты города (целые числа) совпадают с координатами магазина (целые числа), фильтруем массив магазинов
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // рендер будет отличаться, если выбран город
  return (
    <div className={styles.locationList}>
      {
        // если выбраны все города - в списке будут все магазины
        points && !filterCoordinates
          ? points.map((item) => {
              const { address } = item;

              return <LocationItem key={address} {...item} />;
            })
          : // если выбран город - в списке будут только магазины этого города
            filterCoordinates &&
            points.map((item) => {
              const { address, latitude, longitude } = item;

              // здесь сравниваем совпадения координат магазина и города
              if (
                arraysEqual(
                  [Math.trunc(latitude), Math.trunc(longitude)],
                  filterCoordinates.map((item) => Math.trunc(item))
                )
              ) {
                return <LocationItem key={address} {...item} />;
              }

              return null;
            })
      }
    </div>
  );
};

export default LocationList;
