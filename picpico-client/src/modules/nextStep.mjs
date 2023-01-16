import { setErrorInfo } from "../slice/errorInfo";
import { setPicBoothInfo, setSelectionInfo, setDecoInfo, setGalleryInfo } from "../slice/picpicoInfo";
import store from "../store";

export const onNextStepEvent = step => {
  switch (step) {
    case "picBooth":
      store.dispatch(setPicBoothInfo({ value: false }));
      store.dispatch(setSelectionInfo({ value: true }));
      break;
    case "selection":
      store.dispatch(setSelectionInfo({ value: false }));
      store.dispatch(setDecoInfo({ value: true }));
      break;
    case "decoration":
      store.dispatch(setDecoInfo({ value: false }));
      store.dispatch(setGalleryInfo({ value: true }));
      break;
    case "gallery":
      store.dispatch(setGalleryInfo({ value: false }));
      store.dispatch(setPicBoothInfo({ value: true }));
      break;
    default:
      break;
  }
};

export const onPermissionDeniedEvent = errMsg => {
  switch (errMsg) {
    case "onlyKing":
      store.dispatch(setErrorInfo({ value: "방장만 가능합니다." }));
      break;
    case "takeLimit":
      store.dispatch(setErrorInfo({ value: "최소 사진 4장을 찍어야 합니다." }));
      break;
    case "selectLimit":
      store.dispatch(setErrorInfo({ value: "4장만 선택해야 합니다." }));
      break;

    default:
      break;
  }
};
