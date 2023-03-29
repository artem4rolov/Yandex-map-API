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

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // делаем активным текущий выбранный магазин
  React.useEffect(() => {
    if (currentAddress) {
      setActive(currentAddress);
    }
  }, [currentAddress]);

  // при клике на конкретный магазин в списке - задаем его адрес и координаты в store
  const selectPoints = (params, address) => {
    dispatch(setPoint(params));
    dispatch(setAddress(address));
  };

  return (
    <div className={styles.locationList}>
      {points && !filterCoordinates
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
        : filterCoordinates &&
          points.map((item) => {
            const { address, budgets, latitude, longitude } = item;

            // console.log(
            //   JSON.parse([Math.trunc(latitude), Math.trunc(longitude)]) ===
            //     JSON.parse(filterCoordinates)
            // );

            if (
              arraysEqual(
                [Math.trunc(latitude), Math.trunc(longitude)],
                filterCoordinates
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
          })}
    </div>
  );
};

export default LocationList;
