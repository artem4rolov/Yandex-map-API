import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationsList/LocationList";
import PlaceOnMap from "./components/PlaceOnMap/PlaceOnMap";
import Loading from "./components/Loading/Loading";
import { uploadLocations } from "./redux/slices/locationActions";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.points);

  // получаем список магазинов
  React.useEffect(() => {
    dispatch(uploadLocations());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.appContent}>
          <LocationList />
          <PlaceOnMap />
        </div>
      )}
    </div>
  );
}

export default App;
