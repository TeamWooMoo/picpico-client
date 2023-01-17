import { setSelectedInfo } from "../slice/selectionInfo.js";
import store from "../store.js";

export const onPickPicEvent = picIdx => {
  store.dispatch(setSelectedInfo({ value: picIdx }));
};
