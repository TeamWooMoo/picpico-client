import { configureStore } from "@reduxjs/toolkit";
import membersInfo from "./slice/membersInfo";
import picpicoInfo from "./slice/picpicoInfo";
import takepicInfo from "./slice/takepicInfo";
import picturesInfo from "./slice/picturesInfo";
import videosInfo from "./slice/videosInfo";

const store = configureStore({
  reducer: {
    picpicoInfo: picpicoInfo.reducer,
    membersInfo: membersInfo.reducer,
    takepicInfo: takepicInfo.reducer,
    picturesInfo: picturesInfo.reducer,
    videosInfo: videosInfo.reducer,
  },
});

export default store;
