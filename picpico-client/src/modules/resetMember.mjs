import store from "../store.js";
import { setMembersInfo } from "../slice/membersInfo.js";
import { socket } from "./sockets.mjs";
export const onResetMemberEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
    for (let i = 0; i < nicknameArr.length; i++) {
        if (nicknameArr[i]["socketId"] === socket.id) {
            const myFace = document.getElementById(`${socket.id}`);
            myFace.key = `${i}`;
            myFace.style.zIndex = i;
            break;
        }
    }
};

export const onChangeLayerEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
    console.log("new member list:", nicknameArr);
    for (let i = 0; i < nicknameArr.length; i++) {
        const face = document.getElementById(`${socket.id}`);
        face.key = `${i}`;
        face.style.zIndex = i;
    }
};
