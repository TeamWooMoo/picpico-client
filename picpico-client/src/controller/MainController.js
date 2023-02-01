import { addMemberEvent, joinRoom } from "../modules/sockets.mjs";
import { initWebRTC } from "../modules/webRTC.mjs";
import { initStream } from "../modules/stream.mjs";
import { initObserver } from "../modules/observer.mjs";
// import { initPeerCanvas } from "../modules/receiver.mjs";

/******************************************************************* */

export let myVideo;
export let myGreenCanvas;
export let myCanvas;
export let myFace; //! 이름 변경 해야함
export let myStream;
// export let peerCanvas;
export let selfieSegmentation;
export let currentCamera;
export const cameraList = [];

/******************************************************************* */

export const myPeers = {};

export class myPeer {
    connection;
    videoElement;
    canvasElement;
    mediaStream;
    // alphaChannel;
    // alphaReceived;
    mySocketId;
    obAudioElement;

    constructor(newConnection) {
        this.connection = newConnection;
        this.videoElement = document.createElement("video");
        // this.videoElement.hidden = true;
        this.canvasElement = document.createElement("canvas");
        this.mediaStream = null;
        this.obAudioElement = document.createElement("audio");
        // this.alphaChannel = null;
        // this.alphaReceived = null;
    }
}

/******************************************************************* */

const MainController = () => {
    const init = async (roomId, nickName) => {
        if (nickName === "user") {
            initObserver(roomId);
        } else {
            await initStream();
            await joinRoom(roomId);
            await initWebRTC();
            await addMemberEvent(roomId, nickName);
        }
        // await initPeerCanvas();
    };

    return {
        init: async (roomId, nickName) => {
            console.log(">>>>>>>", roomId, nickName);
            // const nickName = "user";
            await init(roomId, nickName);
        },
    };
};

export default MainController;
