import store from "../store.js";
import { setMembersInfo } from "../slice/membersInfo.js";
import { socket } from "./sockets.mjs";

export const onResetMemberEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
    const allCanvases = document.getElementById("allCanvases").children;
    const memberSid = [];
    for (let i = 0; i < nicknameArr.length; i++) {
        memberSid.push(nicknameArr[i]["socketId"]);
    }

    // TEST START
    allCanvases.forEach(canvas => {
        if (!memberSid.includes(canvas.id)) {
            const peerCanvas = document.getElementById(`${canvas.id}`);
            const peerVideo = document.getElementById(`video-${canvas.id}`);
            if (peerVideo) {
                peerVideo.remove();
                if (peerCanvas) peerCanvas.remove();
            }
        }
    });

    // TEST END
    for (let i = 0; i < nicknameArr.length; i++) {
        if (nicknameArr[i]["socketId"] === socket.id) {
            const myFace = document.getElementById(`${socket.id}`);
            if (myFace) {
                myFace.key = `${i}`;
                myFace.style.zIndex = i;
                break;
            }
        }
    }
};

export const onChangeLayerEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
    console.log("new member list:", nicknameArr);
    for (let i = 0; i < nicknameArr.length; i++) {
        const face = document.getElementById(nicknameArr[i]["socketId"]);
        if (face) {
            face.key = `${i}`;
            face.style.zIndex = i;
        }
    }
};
