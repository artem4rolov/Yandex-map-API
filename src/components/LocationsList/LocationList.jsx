import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setPoint } from "../../redux/slices/locationsSlice";

import styles from "./LocationList.module.scss";

const LocationList = () => {
  const [active, setActive] = React.useState(null);
  const dispatch = useDispatch();

  const { points } = useSelector((state) => state.points);
  const { currentAddress } = useSelector((state) => state.points);

  React.useEffect(() => {
    if (currentAddress) {
      setActive(currentAddress);
    }
  }, [currentAddress]);

  const selectPoints = (params, address) => {
    dispatch(setPoint(params));
    dispatch(setAddress(address));
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
        })}
    </div>
  );
};

export default LocationList;
