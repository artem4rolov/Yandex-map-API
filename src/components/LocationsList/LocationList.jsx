import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setPoint } from "../../redux/slices/locationsSlice";

import styles from "./LocationList.module.scss";

const LocationList = () => {
  const [active, setActive] = React.useState(null);
  const dispatch = useDispatch();

  const { points, currentAddress, filterCoordinates } = useSelector(
    (state) => state.points
  );

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

  // делаем активным текущий выбранный магазин, если в redux store он есть
  React.useEffect(() => {
    if (currentAddress) {
      setActive(currentAddress);
    }
  }, [currentAddress]);

  // при клике на конкретный магазин в списке - задаем его адрес и координаты в redux store
  const selectPoints = (params, address) => {
    dispatch(setPoint(params));
    dispatch(setAddress(address));
  };

  // рендер будет отличаться, если выбран город
  return (
    <div className={styles.locationList}>
      {
        // если выбраны все города - в списке будут все магазины
        points && !filterCoordinates
          ? points.map((item) => {
              const { address, budgets, latitude, longitude } = item;

              return (
                <div
                  key={address}
                  className={`${styles.locationItem} ${
                    active === address ? styles.active : ""
                  }`}
                  onClick={() => {
                    setActive(address);
                    selectPoints([latitude, longitude], address);
                  }}
                >
                  <span className={styles.location__adress}>{address}</span>
                  <div className={styles.locationBudgetList}>
                    {budgets &&
                      budgets.map((item) => (
                        <span key={item} className={styles.locationBudget}>
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
              );
            })
          : // если выбран город - в списке будут только магазины этого города
            filterCoordinates &&
            points.map((item) => {
              const { address, budgets, latitude, longitude } = item;

              if (
                arraysEqual(
                  [Math.trunc(latitude), Math.trunc(longitude)],
                  filterCoordinates.map((item) => Math.trunc(item))
                )
              ) {
                return (
                  <div
                    key={address}
                    className={`${styles.locationItem} ${
                      active === address ? styles.active : ""
                    }`}
                    onClick={() => {
                      setActive(address);
                      selectPoints([latitude, longitude], address);
                    }}
                  >
                    <span className={styles.location__adress}>{address}</span>
                    <div className={styles.locationBudgetList}>
                      {budgets &&
                        budgets.map((item) => (
                          <span key={item} className={styles.locationBudget}>
                            {item}
                          </span>
                        ))}
                    </div>
                  </div>
                );
              }

              return null;
            })
      }
    </div>
  );
};

export default LocationList;
