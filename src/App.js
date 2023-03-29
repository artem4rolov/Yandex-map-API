import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationsList/LocationList";
import PlaceOnMap from "./components/PlaceOnMap/PlaceOnMap";
import { uploadLocations } from "./redux/slices/locationActions";

function App() {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = React.useState(null);
  const { loading } = useSelector((state) => state.points);

  // получаем список магазинов
  React.useEffect(() => {
    dispatch(uploadLocations());
  }, [dispatch]);

  // принимаем координаты точки магазина от компонента LocationList и заносим их в стейт, затем передаем их компоненту PlaceOnMap
  const changePoint = (XandY) => {
    setCoordinates(XandY);
  };

  return (
    <div className={styles.app}>
      <Header />
      {loading ? (
        "loading..."
      ) : (
        <div className={styles.appContent}>
          <LocationList choosePoint={changePoint} />
          <PlaceOnMap coordinates={coordinates ? coordinates : null} />
        </div>
      )}
    </div>
  );
}

export default App;
