import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setPoint } from "../../../redux/slices/locationsSlice";

import styles from "../LocationList.module.scss";

const LocationItem = (item) => {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(null);

  const { currentAddress } = useSelector((state) => state.points);

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

  const { address, budgets, latitude, longitude } = item;

  return (
    <div
      key={address}
      className={`${styles.locationItem} ${
        active === address ? styles.active : ""
      }`}
      onClick={() => {
        selectPoints([latitude, longitude], address);
        setActive(item);
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
