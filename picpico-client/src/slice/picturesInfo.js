import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const picturesInfo = createSlice({
  name: "picturesInfo",
  initialState: {
    pictures: [],
  },

  reducers: {
    setPicturesInfo(state, action) {
      console.log("setPicturesInfo");
      state.pictures = action.payload.value;
    },
  },
});

export let { setPicturesInfo } = picturesInfo.actions;

export default picturesInfo;
