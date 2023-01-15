import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const drawingInfo = createSlice({
  name: "drawingInfo",
  initialState: {
    strokes: [],
  },

  reducers: {
    setStrokeInfo(state, action) {
      if (state.strokes.length > 0) {
        state.strokes = [...state.strokes, action.payload.value];
      } else {
        state.strokes = [action.payload.value];
      }
    },
  },
});

export let { setStrokeInfo } = drawingInfo.actions;

export default drawingInfo;
