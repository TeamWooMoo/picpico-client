import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const roomInfo = createSlice({
  name: "roomInfo",
  initialState: {
    room: "",
  },

  reducers: {
    setRoomInfo(state, action) {
      console.log("haha");
      state.room = action.payload.value;
    },
  },
});

export let { setRoomInfo } = roomInfo.actions;

export default roomInfo;
