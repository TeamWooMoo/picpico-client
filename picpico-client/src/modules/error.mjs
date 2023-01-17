import { setErrorDiffInfo } from "../slice/errorInfo.js";
import store from "../store.js";

// export const onPermissionDeniedEvent = () => {
//   store.dispatch(setErrorInfo({ value: "방장만 가능합니다." }));
// };

export const onWrongPickEvent = difference => {
  console.log("4장 안된다구!");
  store.dispatch(setErrorDiffInfo({ value: true }));
};
