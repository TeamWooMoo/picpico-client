import { createSlice } from "@reduxjs/toolkit";

// state 수정 방법 아래에 명시
const drawingInfo = createSlice({
    name: "drawingInfo",
    initialState: {
        strokes: [],
        strokeColor: "black",
        strokeHistory: {},
    },

    reducers: {
        setStrokeInfo(state, action) {
            state.strokes = [...state.strokes, action.payload.value];
        },
        setStrokeColorInfo(state, action) {
            state.strokeColor = action.payload.value;
        },
        addStrokeHistory(state, action) {
            const [socketId, receivedX, receivedY, receivedIdx, receivedColor, downFlag] = action.payload.value;
            state.strokeHistory[socketId] = { x: receivedX, y: receivedY, i: receivedIdx, f: downFlag, c: receivedColor };
        },
    },
});

export let { setStrokeInfo, addStrokeHistory, setStrokeColorInfo } = drawingInfo.actions;

export default drawingInfo;
