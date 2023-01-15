// import { io } from "socket.io-client";
// import { CREDENTIAL } from "../config.js";
import { setMembersInfo } from "../slice/membersInfo.js";
import store from "../store.js";
import { onDoneTakeEvent } from "./takePic.mjs";
// import { BASE_URL } from "../config.js";

let socket;

// export function getSocket() {
//   const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
//   const SERVER = BASE_URL;

//   socket = io(SERVER, socketOptions);
//   return socket;
// }

// export const addMemberEvent = async (roomId, nickname) => {
//   console.log("[add member] - emit - client");
//   socket.emit("add_member", roomId, nickname);
// };

// const onAddMemberEvent = nicknameArr => {
//   store.dispatch(setMembersInfo({ value: nicknameArr }));
// };

// export async function joinRoom(socket, roomId) {
//   socket.emit("join_room", roomId, socket.id);
//   console.log("[join room] - emit - client");

//   socket.on("add_member", onAddMemberEvent);
//   socket.on("done_take", onDoneTakeEvent);
// }
