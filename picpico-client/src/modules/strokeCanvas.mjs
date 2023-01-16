import store from "../store.js";
import { setStrokeInfo, addStrokeHistory, deleteStrokeHistory } from "../slice/drawingInfo.js";
export const onStrokeCanvasEvent = (offsetX, offsetY, color, socketId) => {
  // console.log("onstrokecanvasEvent", offsetX, offsetY, "from", id);
  store.dispatch(setStrokeInfo({ value: [offsetX, offsetY, color, socketId] }));
};

// 다운할 때 저장
export const onMouseDownEvent = (socketId, offsetX, offsetY) => {
  store.dispatch(addStrokeHistory({ value: [socketId, offsetX, offsetY] }));
};

// 업할 때 삭제
export const onMouseUpEvent = socketId => {
  store.dispatch(deleteStrokeHistory({ value: socketId }));
};
