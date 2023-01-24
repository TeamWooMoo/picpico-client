import { setDecoListInfo, setDoneDecoInfo, setMyDecoCanvasInfo, setRealResultInfo } from "../slice/decoInfo.js";
import { setDecoInfo, setGalleryInfo, setPicBoothInfo, setSelectionInfo } from "../slice/picpicoInfo.js";
import { setImgListInfo } from "../slice/selectionInfo.js";
import store from "../store.js";
import { socket } from "./sockets.mjs";
import { ResultImage, Sticker } from "../modules/resultCanvas.mjs";
import { gifTest } from "../test/resultTest.mjs";

export const onDoneTakeEvent = imgArr => {
    console.log("picBooth done~~", imgArr);
    store.dispatch(setImgListInfo({ value: imgArr }));
    store.dispatch(setPicBoothInfo({ value: false }));
    store.dispatch(setSelectionInfo({ value: true }));
};

export const onDonePickEvent = imgArr => {
    store.dispatch(setDecoListInfo({ value: imgArr }));
    store.dispatch(setSelectionInfo({ value: false }));
    store.dispatch(setDecoInfo({ value: true }));
    store.dispatch(setMyDecoCanvasInfo({ value: Object.keys(imgArr)[0] }));
};

export const onDoneDecoEvent = () => {
    const result = store.getState().decoInfo.resultList;
    socket.emit("submit_deco");
    // store.dispatch(setDecoInfo({ value: false }));
    // store.dispatch(setGalleryInfo({ value: true }));
};

export const onSubmitDecoEvent = () => {
    console.log("on submit deco");

    store.dispatch(setDecoInfo({ value: false }));
    store.dispatch(setGalleryInfo({ value: true }));
};
