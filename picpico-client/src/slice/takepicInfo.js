import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const takepicInfo = createSlice({
  name: "takepicInfo",
  initialState: {
    takePic: false,
    picCount: 0,
    picImg: [],
  },

  reducers: {
    setTakePic(state, action) {
      console.log("setTakePic");
      state.takePic = action.payload.value;
    },
    setPicCount(state, action) {
      console.log("setPicCount");
      state.picCount += 1;
    },
    setPicImg(state, action) {
      console.log("setPicImg");
      state.picImg = [...state.picImg, action.payload.value];
    },
  },
});

export let { setTakePic, setPicCount, setPicImg } = takepicInfo.actions;

export default takepicInfo;
