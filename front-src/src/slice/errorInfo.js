import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const errorInfo = createSlice({
  name: "errorInfo",
  initialState: {
    error: "",
  },

  reducers: {
    setErrorInfo(state, action) {
      state.error = action.payload.value;
    },
  },
});

export let { setErrorInfo } = errorInfo.actions;

export default errorInfo;
