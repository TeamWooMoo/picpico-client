import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const selectionInfo = createSlice({
  name: "selectionInfo",
  initialState: {
    selection: [],
  },

  reducers: {
    setSelectionInfo(state, action) {
      console.log("setSelectionInfo");
      state.selection = action.payload.value;
    },
  },
});

export let { setMembersInfo } = selectionInfo.actions;

export default selectionInfo;
