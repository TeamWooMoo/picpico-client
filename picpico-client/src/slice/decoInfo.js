import { createSlice } from "@reduxjs/toolkit";

// state 수정 방법 아래에 명시
const decoInfo = createSlice({
  name: "decoInfo",
  initialState: { pictureSelected: {}, colors: [] },

  // reducers 부분 대폭 수정 필요 !!!!!
  reducers: {
    setStrokeInfo(state, action) {
      state.strokes = [...state.strokes, action.payload.value];
    },
    addStrokeHistory(state, action) {
      const [socketId, receivedX, receivedY] = action.payload.value;
      state.strokeHistory[socketId] = { x: receivedX, y: receivedY };
      console.log(state.strokeHistory);
    },
  },
});

export let { setStrokeInfo, addStrokeHistory } = decoInfo.actions;

export default decoInfo;
