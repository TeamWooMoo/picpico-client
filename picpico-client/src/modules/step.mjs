import { setDecoInfo, setGalleryInfo, setPicBoothInfo, setSelectionInfo } from "../slice/picpicoInfo.js";
import { setPicImg } from "../slice/takepicInfo.js";
import store from "../store.js";

export const onDoneTakeEvent = imgArr => {
  store.dispatch(setPicImg({ value: imgArr }));
  store.dispatch(setPicBoothInfo({ value: false }));
  store.dispatch(setSelectionInfo({ value: true }));
};

export const onDonePickEvent = () => {
  store.dispatch(setSelectionInfo({ value: false }));
  store.dispatch(setDecoInfo({ value: true }));
};

export const onDoneDecoEvent = () => {
  store.dispatch(setDecoInfo({ value: false }));
  store.dispatch(setGalleryInfo({ value: true }));
};
