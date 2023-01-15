import store from "../store.js";
import { setMembersInfo } from "../slice/membersInfo.js";
export const onResetMemberEvent = nicknameArr => {
  store.dispatch(setMembersInfo({ value: nicknameArr }));
};
