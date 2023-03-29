import { createSlice } from "@reduxjs/toolkit";
import { uploadLocations } from "./locationActions";

// если есть список точек (магазинов) есть в localStorage - забираем их
// const points = localStorage.getItem("points")
//   ? JSON.parse(localStorage.getItem("points") || "[]")
//   : null;

const initialState = {
  city: null,
  points: null,
  loading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // получение всех точек в городе
      .addCase(uploadLocations.pending, (state) => {
        state.loading = true;
        state.points = null;
        // localStorage.setItem("points", JSON.stringify(state.points));
      })
      .addCase(uploadLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload.pickPoints;
        // localStorage.setItem("points", JSON.stringify(state.points));
      })
      .addCase(uploadLocations.rejected, (state, action) => {
        state.loading = false;
        state.points = null;
        state.error = action.payload;
        // localStorage.setItem("points", JSON.stringify(state.points));
      });
  },
});

export default locationsSlice.reducer;
