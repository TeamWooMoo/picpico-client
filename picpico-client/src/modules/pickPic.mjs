// 이 파일은 슬라이스가 아님.
// controller가 사용하는 모듈임.

import { setSelected } from "../slice/takepicInfo.js";
import store from "../store.js";

export const onPickPicEvent = picIdx => {
  store.dispatch(setSelected({ value: picIdx }));
};
