import { io } from "socket.io-client";
import { CREDENTIAL } from "../config.js";
import { onDoneTakeEvent } from "./takePic.mjs";
import { BASE_URL } from "../config.js";
import { onResetMemberEvent } from "./resetMember.mjs";

let socket;

export function getSocket() {
  const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
  // const SERVER = 'https://picpico-server.site';
  const SERVER = BASE_URL;

  socket = io(SERVER, socketOptions);
  return socket;
}

export const addMemberEvent = async (roomId, nickname) => {
  console.log("[add member] - emit - client");
  socket.emit("add_member", roomId, nickname);
};

export async function joinRoom(socket, roomId) {
  socket.emit("join_room", roomId, socket.id);
  console.log("[join room] - emit - client");

  socket.on("reset_member", onResetMemberEvent);
  // socket.on("test_pic", onTestPicEvent);
  socket.on("done_take", onDoneTakeEvent);
}
