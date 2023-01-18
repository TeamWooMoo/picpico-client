import { async } from "rxjs";
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
  const canvas = document.getElementById("drawnCanvas");
  const ctx = canvas.getContext("2d");
  async function first() {
    console.log("나는 방장ㅇ이야");
    console.log("canvas:", canvas);
    console.log("on send pic event idx: ", idx);

    let newImgArr = [];

    await imgArr.forEach(async obj => {
      const url = obj.picture;
      const img = new Image();
      newImgArr.push(img);

      img.src = url;
      img.onload = async function () {
        await ctx.drawImage(img, 0, 0);
        console.log("img:", img.src);
      };
    });
  }

  await first();

  const resultUrl = await canvas.toDataURL("image/png");
  await socket.emit("result_pic", idx, resultUrl);
  console.log("result:", resultUrl);
  console.log("사진 5장 다 그렸음. 서버야 이게 최종본이야");
  ctx.clearReact(0, 0, 350, 350);
};
