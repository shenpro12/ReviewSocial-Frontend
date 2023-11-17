import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currProvinceId: "6d71f6f0-a4cd-4f98-aa85-33ad8ffaa25a",
  provinces: [],
};

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    addListProvince: (state, action) => {
      state.provinces = action.payload;
    },
    changeProvince: (state, action) => {
      if (state.currProvinceId !== action.payload) {
        state.currProvinceId = action.payload;
      }
    },
  },
});
export const { addListProvince, changeProvince } = provinceSlice.actions;
export const getCurrProvince = (state) => {
  return (
    state.province.provinces.find(
      (province) => province.id === state.province.currProvinceId
    ) || { name: "Hồ Chí Minh", id: "6d71f6f0-a4cd-4f98-aa85-33ad8ffaa25a" }
  );
};

export const getAll = (state) => state.province.provinces;

export default provinceSlice.reducer;
