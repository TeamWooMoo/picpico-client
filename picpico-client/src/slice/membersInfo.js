import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const membersInfo = createSlice({
  name: "membersInfo",
  initialState: {
    nickname: "",
    members: [],
    king: false,
  },

  reducers: {
    setNickNameInfo(state, action){
      state.nickname = action.payload.value;
    },
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

export let { setNickNameInfo, setMembersInfo, setKingInfo } = membersInfo.actions;

export default membersInfo;
