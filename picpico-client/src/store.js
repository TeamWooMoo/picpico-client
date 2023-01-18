import { configureStore } from "@reduxjs/toolkit";
import membersInfo from "./slice/membersInfo";
import picpicoInfo from "./slice/picpicoInfo";
import takepicInfo from "./slice/takepicInfo";
import videosInfo from "./slice/videosInfo";
import drawingInfo from "./slice/drawingInfo";
import roomInfo from "./slice/roomInfo";
import errorInfo from "./slice/errorInfo";
import selectionInfo from "./slice/selectionInfo";
import decoInfo from "./slice/decoInfo";
const store = configureStore({
  reducer: {
    picpicoInfo: picpicoInfo.reducer,
    membersInfo: membersInfo.reducer,
    takepicInfo: takepicInfo.reducer,
    videosInfo: videosInfo.reducer,
    drawingInfo: drawingInfo.reducer,
    roomInfo: roomInfo.reducer,
    errorInfo: errorInfo.reducer,
    selectionInfo: selectionInfo.reducer,
    decoInfo: decoInfo.reducer,
  },
});

export default store;
