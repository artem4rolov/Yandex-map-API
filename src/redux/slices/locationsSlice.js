import { createSlice } from "@reduxjs/toolkit";
import { uploadLocations } from "./locationActions";

const initialState = {
  city: null,
  points: null,
  loading: false,
  error: null,
  currentPoint: [55.320255, 58.769415],
  currentAddress: null,
  filterCoordinates: null,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    // задаем координаты точки
    setPoint: (state, action) => {
      state.currentPoint = action.payload;
    },
    // задаем адрес выбранной точки
    setAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    // фильтр магазинов по городам
    // у каждого города первые цифры координат (целые числа) совпадают с координатами (целыми числами) первых чисел магазинов этого города
    setFilter: (state, action) => {
      switch (action.payload) {
        case "Все города":
          state.filterCoordinates = null;
          break;

        case "Уфа":
          state.filterCoordinates = [54.734853, 55.9578647];
          break;

        case "Екатеринбург":
          state.filterCoordinates = [56.8386326, 60.6054887];
          break;

        case "Салават":
          state.filterCoordinates = [53.3616311, 55.9245559];
          break;

        default:
          state.filterCoordinates = null;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // получение всех точек в городе
      .addCase(uploadLocations.pending, (state) => {
        state.loading = true;
        state.points = null;
      })
      .addCase(uploadLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload.pickPoints;
      })
      .addCase(uploadLocations.rejected, (state, action) => {
        state.loading = false;
        state.points = null;
        state.error = action.payload;
      });
  },
});

export default locationsSlice.reducer;

export const { setPoint, setAddress, setFilter } = locationsSlice.actions;
