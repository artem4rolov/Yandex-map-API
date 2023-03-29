import { createSlice } from "@reduxjs/toolkit";
import { uploadLocations } from "./locationActions";

const initialState = {
  city: null,
  points: null,
  loading: false,
  error: null,
  currentPoint: [55.320255, 58.769415],
  currentAddress: null,
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

export const { setPoint, setAddress } = locationsSlice.actions;
