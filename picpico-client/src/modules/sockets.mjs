import { io } from "socket.io-client";
import { CREDENTIAL } from "../config.js";
import { onDoneDecoEvent, onDonePickEvent, onDoneTakeEvent, onSubmitDecoEvent } from "./step.mjs";
import { BASE_URL } from "../config.js";
import { onResetMemberEvent } from "./resetMember.mjs";
import { onStrokeCanvasEvent, onMouseDownEvent } from "./strokeCanvas.mjs";
import { onPickPicEvent } from "./pickPic.mjs";
import { onPermissionDeniedEvent } from "./error.mjs";
import { onClickShutterEvent, onSendPicEvent } from "./clickshutter.mjs";
import { onPickDecoEvent, onPickStickerEvent } from "./decoCanvas.mjs";
// let socket;
const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
const SERVER = BASE_URL;

export const socket = io(SERVER, socketOptions);

export const addMemberEvent = async (roomId, nickname) => {
    socket.emit("add_member", roomId, nickname);
};

export async function joinRoom(roomId) {
    socket.emit("join_room", roomId, socket.id);
    socket.on("reset_member", onResetMemberEvent);
    socket.on("click_shutter", onClickShutterEvent);
    socket.on("send_pic", onSendPicEvent);
    socket.on("pick_pic", onPickPicEvent);
    socket.on("done_take", onDoneTakeEvent);
    socket.on("done_pick", onDonePickEvent);
    socket.on("done_deco", onDoneDecoEvent);
    socket.on("stroke_canvas", onStrokeCanvasEvent);
    socket.on("mouse_down", onMouseDownEvent);
    socket.on("permission_denied", onPermissionDeniedEvent);
    socket.on("pick_deco", onPickDecoEvent);
    socket.on("submit_deco", onSubmitDecoEvent);
    socket.on("pick_sticker", onPickStickerEvent);
}
