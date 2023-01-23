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
            console.log("myFace:", myFace, myFace.style.zIndex);
        } else {
            // const peerFace = document.getElementById(`${nicknameArr[i]["socketId"]}`);
            // console.log("reset member peer:", nicknameArr[i]["socketId"], peerFace);
            // peerFace.style.zIndex = i;
            // peerFace.key = `${i}`;
        }
    }
};
