import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const takepicInfo = createSlice({
  name: "takepicInfo",
  initialState: {
    takePic: false,
    picCount: 0,
    picImg: [],
    selected: [],
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
    setSelected(state, action) {
      console.log("setPicked");
      state.selected = action.payload.value;
    },
  },
});

export let { setTakePic, setPicCount, setPicImg, setSelected } = takepicInfo.actions;

export default takepicInfo;
