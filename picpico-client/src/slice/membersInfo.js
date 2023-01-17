import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const membersInfo = createSlice({
  name: "membersInfo",
  initialState: {
    members: [],
    king: false,
  },

  reducers: {
    setMembersInfo(state, action) {
      console.log("setMembersInfo");
      state.members = action.payload.value;
    },
    setKingInfo(state, action) {
      console.log("im king");
      state.king = action.payload.value;
    },
  },
});

export let { setMembersInfo, setKingInfo } = membersInfo.actions;

export default membersInfo;
