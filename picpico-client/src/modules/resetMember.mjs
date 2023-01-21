import store from "../store.js";
import { setMembersInfo } from "../slice/membersInfo.js";
import { socket } from "./sockets.mjs";
//key: picturenumber, value: object_key: viewers , value: []
export const onResetMemberEvent = nicknameArr => {
    console.log("reset member on", nicknameArr);
    store.dispatch(setMembersInfo({ value: nicknameArr }));
    let myOrder;
    for (let i = 0; i < nicknameArr.length; i++) {
        if (nicknameArr[i]["socketId"] === socket.id) {
            console.log("--------->", nicknameArr[i]["socketId"], socket.id);
            myOrder = i;
            console.log("my order!!!!", i);
            break;
        }
    }
    console.log("myOrder", myOrder);
    const myFace = document.getElementById("myFace");
    myFace.id = `${myOrder}`;
    myFace.style.zIndex = myOrder;
};
