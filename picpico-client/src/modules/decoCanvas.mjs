import { setDecoListInfo } from "../slice/decoInfo.js";
import store from "../store.js";

export const onPickDecoEvent = obj => {
  store.dispatch(setDecoListInfo({ value: obj }));
};
