import { createAsyncThunk } from "@reduxjs/toolkit";

// подгружаем локации в зависимости от выбранного города
export const uploadLocations = createAsyncThunk("uploadLocations", async () => {
  try {
    const data = await fetch("state.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    return data;
  } catch (err) {
    console.log(err);
  }
});
