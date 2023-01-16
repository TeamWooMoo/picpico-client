import { io } from "socket.io-client";
import { CREDENTIAL } from "../config.js";
import { onDoneTakeEvent } from "./takePic.mjs";
import { BASE_URL } from "../config.js";
import { onResetMemberEvent } from "./resetMember.mjs";
import { onStrokeCanvasEvent } from "./strokeCanvas.mjs";
import { onPickPicEvent } from "./pickPic.mjs";

// let socket;
const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
const SERVER = BASE_URL;
// export function getSocket() {
//   const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
//   // const SERVER = 'https://picpico-server.site';
//   const SERVER = BASE_URL;

//   socket = io(SERVER, socketOptions);
//   return socket;
// }
export const socket = io(SERVER, socketOptions);

export const addMemberEvent = async (roomId, nickname) => {
  console.log("ADDDDD");
  socket.emit("add_member", roomId, nickname);
};

export async function joinRoom(roomId) {
  console.log("client emit join room");
  socket.emit("join_room", roomId, socket.id);
  socket.on("reset_member", onResetMemberEvent);
  // socket.on("test_pic", onTestPicEvent);
  socket.on("pick_pic", onPickPicEvent);
  socket.on("done_take", onDoneTakeEvent);
  socket.on("stroke_canvas", onStrokeCanvasEvent);
}
// console.log("onstrokecanvasEvent", offsetX, offsetY, "from", id);
//   store.dispatch(setStrokeInfo({ value: [offsetX, offsetY] }));
