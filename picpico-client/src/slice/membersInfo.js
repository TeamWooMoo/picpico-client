import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const membersInfo = createSlice({
  name: "membersInfo",
  initialState: {
    members: [],
  },

  reducers: {
    setMembersInfo(state, action) {
      console.log("setMembersInfo");
      state.members = action.payload.value;
    },
  },
});

export let { setMembersInfo } = membersInfo.actions;

export default membersInfo;
