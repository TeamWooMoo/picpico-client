import { addMemberEvent, joinRoom } from "../modules/sockets.mjs";
import { initWebRTC } from "../modules/webRTC.mjs";
import { initStream } from "../modules/stream.mjs";
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

    constructor(newConnection) {
        this.connection = newConnection;
        this.videoElement = document.createElement("video");
        // this.videoElement.hidden = true;
        this.canvasElement = document.createElement("canvas");
        this.mediaStream = null;
        // this.alphaChannel = null;
        // this.alphaReceived = null;
    }
}

/******************************************************************* */

const MainController = () => {
    const init = async (roomId, nickName) => {
        await initStream();
        await joinRoom(roomId);
        await initWebRTC();
        await addMemberEvent(roomId, nickName);
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
