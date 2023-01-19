import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const decoInfo = createSlice({
  name: "decoInfo",
  initialState: {
    decoList: {},
    myDecoCanvas: "",
    decoMode: "stroke",
    colorList: ["#d62d20", "#ffa700", "#008744", "#0057e7"],
    doneDeco: false,
    resultList: [],
    realResultList: [],
  },

  reducers: {
    setDecoListInfo(state, action) {
      state.decoList = action.payload.value;
    },
    setMyDecoCanvasInfo(state, action) {
      state.myDecoCanvas = action.payload.value;
    },
    setDecoModeInfo(state, action) {
      state.decoMode = action.payload.value;
    },
    setDoneDecoInfo(state, action) {
      state.doneDeco = action.payload.value;
    },
    setResultInfo(state, action) {
      state.resultList = action.payload.value;
    },
    setRealResultInfo(state, action) {
      state.realResultList = action.payload.value;
    },
  },
});

export let { setDecoListInfo, setMyDecoCanvasInfo, setDecoModeInfo, setDoneDecoInfo, setResultInfo, setRealResultInfo } = decoInfo.actions;

export default decoInfo;
