import store from "../store.js";
import { setMembersInfo } from "../slice/membersInfo.js";
import { socket } from "./sockets.mjs";
//key: picturenumber, value: object_key: viewers , value: []
export const onResetMemberEvent = nicknameArr => {
    const memberArr = store.getState().membersInfo.members;
    console.log("memberArr", memberArr);
    let myOrder;
    for (let i = 0; i < memberArr.length - 1; i++) {
        if (memberArr[i].socketId === socket.id) {
            myOrder = i;
            console.log("my order!!!!");
            break;
        }
    }
    console.log("reset member on");
    store.dispatch(setMembersInfo({ value: nicknameArr }));
    const myFace = document.getElementById("myFace");
    myFace.style.zIndex = myOrder;
};
