import { setIdxCount, setTakePic } from "../slice/takepicInfo.js";
import store from "../store.js";
// import { socket } from "./sockets.mjs";
export const onClickShutterEvent = idx => {
    console.log("애들아 찍어!");
    store.dispatch(setIdxCount({ value: (parseInt(idx) + 1).toString() }));
    store.dispatch(setTakePic({ value: true }));
};

// export const onSendPicEvent = async (idx, imgUrl) => {
//     const canvas = document.getElementById("drawnCanvas");
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(imgUrl);

//     // console.log(">>", imgArr);
//     const resultUrl = await canvas.toDataURL("image/png");

//     socket.emit("result_pic", idx, resultUrl);
//     // console.log("result:", resultUrl);
//     // console.log("사진 5장 다 그렸음. 서버야 이게 최종본이야");
//     ctx.clearRect(0, 0, 350, 350);
// };
