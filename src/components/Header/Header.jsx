import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className="App-header">
      <select placeholder="Выберите город">
        <option value="Волгоград" key=""></option>
      </select>
    </header>
  );
};

export default Header;
