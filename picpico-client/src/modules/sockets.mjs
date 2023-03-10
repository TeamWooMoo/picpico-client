import {io} from "socket.io-client";
import {CREDENTIAL} from "../config.js";
import {onDoneDecoEvent, onDonePickEvent, onDoneTakeEvent, onSubmitDecoEvent} from "./step.mjs";
import {BASE_URL} from "../config.js";
import {onChangeLayerEvent, onResetMemberEvent} from "./resetMember.mjs";
import {onStrokeCanvasEvent, onMouseDownEvent} from "./strokeCanvas.mjs";
import {onPickPicEvent} from "./pickPic.mjs";
import {onPermissionDeniedEvent} from "./error.mjs";
import {onClickShutterEvent} from "./clickshutter.mjs";
import {onPickBgEvent, onPickDecoEvent, onPickStickerEvent, onStickerMoveEvent} from "./decoCanvas.mjs";
import {obOnClickShutterEvent} from "./observer.mjs";

const socketOptions = {withCredentials: CREDENTIAL.withCredentials};
const SERVER = BASE_URL;

export const socket = io(SERVER, socketOptions);

export const addMemberEvent = async (roomId, nickname) => {
    socket.emit("add_member", roomId, nickname);
};

export async function joinRoom(roomId, nickName) {
    socket.emit("join_room", roomId, socket.id);
    if (nickName !== "user") {
        socket.on("reset_member", onResetMemberEvent);
        socket.on("click_shutter", onClickShutterEvent);
        socket.on("pick_pic", onPickPicEvent);
        socket.on("stroke_canvas", onStrokeCanvasEvent);
        socket.on("mouse_down", onMouseDownEvent);
        socket.on("pick_deco", onPickDecoEvent);
        socket.on("pick_sticker", onPickStickerEvent);
        socket.on("change_layer", onChangeLayerEvent);
        socket.on("sticker_move", onStickerMoveEvent);
        socket.on("pick_bg", onPickBgEvent);
    } else {
        socket.on("click_shutter", obOnClickShutterEvent);
    }
    socket.on("done_take", onDoneTakeEvent);
    socket.on("done_pick", onDonePickEvent);
    socket.on("done_deco", onDoneDecoEvent);
    socket.on("submit_deco", onSubmitDecoEvent);
    socket.on("permission_denied", onPermissionDeniedEvent);
}
