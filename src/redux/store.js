import { combineReducers, configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./slices/locationsSlice";

// здесь пишем все наши редюсеры и оборачиваем в главный rootReducer
const rootReducer = combineReducers({
  points: locationsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
