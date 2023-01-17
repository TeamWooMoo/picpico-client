import { setImgIdxCount } from "../slice/takepicInfo.js";
import store from "../store.js";

export const onTakePicEvent = imgIdx => {
  console.log("somebody shutter!");
  store.dispatch(setImgIdxCount({ value: imgIdx }));
};
