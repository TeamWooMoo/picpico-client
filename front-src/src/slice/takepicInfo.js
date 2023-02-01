import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const takepicInfo = createSlice({
  name: "takepicInfo",
  initialState: {
    takePic: false,
    idx: 0,
  },

  reducers: {
    setTakePic(state, action) {
      state.takePic = action.payload.value;
    },
    setIdxCount(state, action) {
      state.idx = action.payload.value;
    },
  },
});

export let { setTakePic, setIdxCount } = takepicInfo.actions;

export default takepicInfo;
