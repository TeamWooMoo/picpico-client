import { setPicImg } from "../slice/takepicInfo.js";
import store from "../store.js";

export const onDoneTakeEvent = imgArr => {
  console.log("onDoneTake");
  store.dispatch(setPicImg({ value: imgArr }));
};
