import { setIdxCount, setTakePic } from "../slice/takepicInfo.js";
import store from "../store.js";
import { socket } from "./sockets.mjs";

export const onClickShutterEvent = idx => {
  console.log("애들아 찍어!");
  store.dispatch(setIdxCount({ value: (parseInt(idx) + 1).toString() }));
  store.dispatch(setTakePic({ value: true }));
};

//im
export const onSendPicEvent = async (idx, imgArr) => {
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

    img.src = url;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
  });

  const resultUrl = await canvas.toDataURL("image/png");
  await socket.emit("result_pic", idx, resultUrl);
  console.log("result:", resultUrl);
  console.log("사진 5장 다 그렸음. 서버야 이게 최종본이야");
  // canvas.remove();
};
