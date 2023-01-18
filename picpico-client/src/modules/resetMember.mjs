import store from "../store.js";
import { setMembersInfo } from "../slice/membersInfo.js";
//key: picturenumber, value: object_key: viewers , value: []
export const onResetMemberEvent = nicknameArr => {
  console.log("reset member on");
  store.dispatch(setMembersInfo({ value: nicknameArr }));
};
