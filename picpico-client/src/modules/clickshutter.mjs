import { setIdxCount, setTakePic } from "../slice/takepicInfo.js";
import store from "../store.js";
import { socket } from "./sockets.mjs";

export const onClickShutterEvent = idx => {
  console.log("애들아 찍어!");
  store.dispatch(setIdxCount({ value: (parseInt(idx) + 1).toString() }));
  store.dispatch(setTakePic({ value: true }));
};

//im
export const onSendPicEvent = (idx, imgArr) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  console.log("on send pic event idx: ", idx);

  imgArr.forEach(obj => {
    const url = obj.picture;
    console.log("url:", url);
    ctx.drawImage(url, 0, 0);
  });

  const resultUrl = canvas.toDataURL();
  // idx가 서버가 주는거라 내가 따로 -1 안해도 됨
  socket.emit("result_pic", idx, resultUrl);
  console.log("사진 5장 다 그렸음. 서버야 이게 최종본이야");
};
