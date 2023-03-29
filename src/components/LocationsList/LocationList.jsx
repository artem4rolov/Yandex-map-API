import React from "react";
import { useSelector } from "react-redux";

import styles from "./LocationList.module.scss";

const LocationList = () => {
  const { points } = useSelector((state) => state.points);

  React.useEffect(() => {
    console.log(points);
  }, [points]);

  return (
    <div className={styles.locationList}>
      {points &&
        points.map((item) => {
          const { address, budgets } = item;

          return (
            <div key={address} className={styles.locationItem}>
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
