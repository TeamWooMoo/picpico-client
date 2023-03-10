import { setBgInfo, setDecoListInfo, setStickerInfo, setStickerPointInfo } from "../slice/decoInfo.js";
import store from "../store.js";

export const onPickDecoEvent = obj => {
    console.log("obj from server", obj);
    store.dispatch(setDecoListInfo({ value: obj }));
};

export const onPickStickerEvent = (url, imgIdx, stickerId) => {
    store.dispatch(setStickerInfo({ value: { idx: imgIdx, url: url, stickerId: stickerId } }));
};

export const onStickerMoveEvent = (left, top, stickerId) => {
    store.dispatch(setStickerPointInfo({ value: [left, top, stickerId] }));
};

export const onPickBgEvent = (bgIdx, setIdx) => {
    console.log("onPickBgEvent:", parseInt(bgIdx), parseInt(setIdx));
    store.dispatch(setBgInfo({ value: [parseInt(bgIdx), parseInt(setIdx)] }));
};
