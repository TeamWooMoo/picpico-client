import store from "../store.js";
import { setMembersInfo } from "../slice/membersInfo.js";
import { socket } from "./sockets.mjs";
export const onResetMemberEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
    for (let i = 0; i < nicknameArr.length; i++) {
        if (nicknameArr[i]["socketId"] === socket.id) {
            const myFace = document.querySelector(".myFace");
            myFace.key = `${i}`;
            myFace.style.zIndex = i;
        } else {
            const peerFace = document.querySelector(`.${nicknameArr[i]["socketId"]}`);
            peerFace.style.zIndex = i;
            peerFace.key = `${i}`;
        }
    }
};
