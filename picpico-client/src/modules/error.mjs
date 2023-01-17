import { setErrorInfo } from "../slice/errorInfo.js";
import store from "../store.js";

export const onPermissionDeniedEvent = () => {
  store.dispatch(setErrorInfo({ value: "방장만 가능합니다." }));
};
