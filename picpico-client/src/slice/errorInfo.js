import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const errorInfo = createSlice({
  name: "errorInfo",
  initialState: {
    difference: false,
  },

  reducers: {
    setErrorDiffInfo(state, action) {
      state.error = action.payload.value;
    },
  },
});

export let { setErrorDiffInfo } = errorInfo.actions;

export default errorInfo;
