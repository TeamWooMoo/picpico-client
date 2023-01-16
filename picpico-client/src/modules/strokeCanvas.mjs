import store from "../store.js";
import { setStrokeInfo } from "../slice/drawingInfo.js";
export const onStrokeCanvasEvent = (offsetX, offsetY, id) => {
  // console.log("onstrokecanvasEvent", offsetX, offsetY, "from", id);
  store.dispatch(setStrokeInfo({ value: [offsetX, offsetY] }));
};
