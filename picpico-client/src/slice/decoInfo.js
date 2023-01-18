import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const decoInfo = createSlice({
  name: "decoInfo",
  initialState: {
    decoList: {},
    myDecoCanvas: "",
  },

  reducers: {
    setDecoListInfo(state, action) {
      state.decoList = action.payload.value;
    },
    setMyDecoCanvasInfo(state, action) {
      state.myDecoCanvas = action.payload.value;
    },
  },
});

export let { setDecoListInfo, setMyDecoCanvasInfo } = decoInfo.actions;

export default decoInfo;
