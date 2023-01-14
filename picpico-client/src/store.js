import { configureStore } from "@reduxjs/toolkit";
import membersInfo from "./slice/membersInfo";
import picpicoInfo from "./slice/picpicoInfo";

const store = configureStore({
  reducer: {
    picpicoInfo: picpicoInfo.reducer,
    membersInfo: membersInfo.reducer,
  },
});

export default store;
