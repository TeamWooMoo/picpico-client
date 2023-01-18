import { useSelector } from "react-redux";
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
  const isKing = store.getState().membersInfo.king;

  console.log("나는 방장ㅇ이야");
  const canvas = document.createElement("canvas");
  canvas.width = 350;
  canvas.height = 350;
  const ctx = canvas.getContext("2d");
  console.log("on send pic event idx: ", idx);

  imgArr.forEach(obj => {
    const url = obj.picture;
    const img = new Image();
    // console.log("url:", url);
    console.log(">>url", img.src, img);
    ctx.drawImage(img, 0, 0);
    img.src = url;
  });

  const resultUrl = canvas.toDataURL("image/png");
  console.log("result:", resultUrl);
  // idx가 서버가 주는거라 내가 따로 -1 안해도 됨
  socket.emit("result_pic", idx, resultUrl);
  console.log("사진 5장 다 그렸음. 서버야 이게 최종본이야");
  // canvas.remove();
};
