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
      state.takePic = action.payload.value;
    },
    setPicCount(state, action) {
      state.picCount += 1;
    },
    setPicImg(state, action) {
      // 찍은 애들이 여기에 들어갈거에요
      state.picImg = action.payload.value;
    },
    setSelected(state, action) {
      state.selected = [...state.selected, action.payload.value];
    },
  },
});

export let { setTakePic, setPicCount, setPicImg, setSelected } = takepicInfo.actions;

export default takepicInfo;
