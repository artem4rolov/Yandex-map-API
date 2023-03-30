import React from "react";
import { useDispatch } from "react-redux";
import { setAddress, setPoint } from "../../../redux/slices/locationsSlice";

import styles from "../LocationList.module.scss";

const LocationItem = (item, active) => {
  const dispatch = useDispatch();
  // при клике на конкретный магазин в списке - задаем его адрес и координаты в redux store
  const selectPoints = (params, address) => {
    dispatch(setPoint(params));
    dispatch(setAddress(address));
  };
  const { address, budgets, latitude, longitude } = item;
  return (
    <div
      key={address}
      className={`${styles.locationItem} ${
        active === address ? styles.active : ""
      }`}
      onClick={() => {
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
};

export default LocationItem;
