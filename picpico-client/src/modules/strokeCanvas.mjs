import store from "../store.js";
import { setStrokeInfo, addStrokeHistory } from "../slice/drawingInfo.js";

export const onStrokeCanvasEvent = (offsetX, offsetY, color, socketId) => {
  store.dispatch(setStrokeInfo({ value: [offsetX, offsetY, color, socketId] }));
};

export const onMouseDownEvent = (socketId, offsetX, offsetY) => {
  store.dispatch(addStrokeHistory({ value: [socketId, offsetX, offsetY] }));
};
