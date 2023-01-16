import { createSlice } from "@reduxjs/toolkit";

// state 수정 방법 아래에 명시
const drawingInfo = createSlice({
  name: "drawingInfo",
  initialState: {
    strokeHistory: {},
    strokes: [],
  },

  reducers: {
    setStrokeInfo(state, action) {
      // if (state.strokes.length > 0) {
      //   state.strokes = [...state.strokes, action.payload.value];
      // } else {
      //   state.strokes = [action.payload.value];
      // }
      // const [receivedX, receivedY, receivedColor, socketId] = action.payload.value;
      state.strokes = [...state.strokes, action.payload.value];
    },
    addStrokeHistory(state, action) {
      const [socketId, receivedX, receivedY] = action.payload.value;
      state.strokeHistory[socketId] = { x: receivedX, y: receivedY };
      console.log(state.strokeHistory);
    },
    // deleteStrokeHistory(state, action) {
    //   delete state.strokeHistory[action.payload.value];
    // },
  },
});

export let { setStrokeInfo, addStrokeHistory } = drawingInfo.actions;

export default drawingInfo;
