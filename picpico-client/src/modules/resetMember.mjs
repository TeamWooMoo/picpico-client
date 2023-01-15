import store from "../store.js";
import { setPicImg } from "../slice/takepicInfo.js";
export const onResetMemberEvent = imgArr => {
  store.dispatch(setPicImg({ value: imgArr }));
};
