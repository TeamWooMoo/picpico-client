import { configureStore } from "@reduxjs/toolkit";
import picpicoInfo from "./slice/picpicoInfo";

const store = configureStore({
  reducer: {
    picpicoInfo: picpicoInfo.reducer,
  },
});

export default store;
