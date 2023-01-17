import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const takepicInfo = createSlice({
  name: "takepicInfo",
  initialState: {
    takePic: false,
    imgIdx: 0,
  },

  reducers: {
    setTakePic(state, action) {
      state.takePic = action.payload.value;
    },
    setImgIdxCount(state, action) {
      state.imgIdx = action.payload.value;
    },
  },
});

export let { setTakePic, setImgIdxCount } = takepicInfo.actions;

export default takepicInfo;
