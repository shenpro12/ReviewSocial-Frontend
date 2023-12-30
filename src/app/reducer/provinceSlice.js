import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currProvinceId: "",
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
    ) || state.province.provinces[0]
  );
};

export const getAll = (state) => state.province.provinces;

export default provinceSlice.reducer;
