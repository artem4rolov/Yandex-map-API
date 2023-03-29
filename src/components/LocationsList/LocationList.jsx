import React from "react";
import { useSelector } from "react-redux";

import styles from "./LocationList.module.scss";

const LocationList = ({ choosePoint }) => {
  const [active, setActive] = React.useState(null);

  const { points } = useSelector((state) => state.points);

  React.useEffect(() => {
    // console.log(points);
  }, [points]);

  const selectPoints = (params) => {
    choosePoint(params);
    // console.log(params);
  };

  return (
    <div className={styles.locationList}>
      {points &&
        points.map((item) => {
          const { address, budgets, latitude, longitude } = item;

          return (
            <div
              key={address}
              className={`${styles.locationItem} ${
                active === address ? styles.active : ""
              }`}
              onClick={() => {
                setActive(address);
                selectPoints([latitude, longitude]);
                // console.log([latitude, longitude]);
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
        })}
    </div>
  );
};

export default LocationList;
