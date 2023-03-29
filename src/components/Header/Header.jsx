import React from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { setFilter } from "../../redux/slices/locationsSlice";

import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  const handleChange = (selectedOption) => {
    dispatch(setFilter(selectedOption.value));
  };

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      width: "200px",
      boxShadow: "2px 2px 2px rgba(33, 33, 33, 0.1)",
      borderRadius: "4px",
    }),
    option: (styles) => {
      return { ...styles };
    },
  };

  const options = [
    { value: "Екатеринбург", label: "Екатеринбург" },
    { value: "Салават", label: "Салават" },
    { value: "Уфа", label: "Уфа" },
    { value: "Все города", label: "Все города" },
  ];

  return (
    <header className={styles.header}>
      <Select
        placeholder="Выберите город"
        onChange={handleChange}
        options={options}
        styles={colorStyles}
      />
    </header>
  );
};

export default Header;
