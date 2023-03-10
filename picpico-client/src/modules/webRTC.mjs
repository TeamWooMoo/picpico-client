import store from "../store.js";
import { setVideosInfo } from "../slice/videosInfo.js";
import { myPeer, myPeers, myStream } from "../controller/MainController.js";
import { socket } from "./sockets.mjs";
import { initWebGL } from "./webgl-transparency.mjs";

/* myPeers
 *    key    :    value
 *
 * socketId  :    myPeer
 *            {
 *                connection    :
 *                videoElement  :
 *                canvasElement :
 *                audioTrack    :
//  *                alphaChannel  :
//  *                alphaData     :
 *            }
 */

/******************************************************************* */

const handleIce = data => {
    const mySocketId = socket.id;
    for (const [peerSocketId, myPeer] of Object.entries(myPeers)) {
        if (myPeer.connection === data.target) {
            console.log("[ice] - emit - client");
            socket.emit("ice", data.candidate, peerSocketId, mySocketId);
            break;
        }
    }
};

const handleTrack = (data, myPeer) => {
    console.log(">>>>handling track");
    if (data.track.kind === "video") {
        console.log(">>>handling track : video !");

        const membersArr = store.getState().membersInfo.members;
        const videoRow = document.getElementById("peerVideos");
        const canvasRow = document.getElementById("allCanvases");
        const peerVideo = myPeer.videoElement;
        const peerCanvasGL = myPeer.canvasElement;

        let peerOrder;

        for (let i = 0; i < membersArr.length; i++) {
            if (membersArr[i]["socketId"] === myPeer.mySocketId) {
                peerOrder = i;
                break;
            }
        }

        // const peerAudio = myPeer.audioTrack;

        //! component 변경 시 audio stream 전달 구현 위해 추가
        // console.log("data.streams[0].getAudioTracks()[0]", data.streams[0].getAudioTracks()[0]);
        myPeer.mediaStream = data.streams[0];

        peerVideo.hidden = true;
        peerVideo.width = 350;
        peerVideo.height = 350;
        peerVideo.id = `video-${myPeer.mySocketId}`;

        // pecderVideo.muted = true;
        // peerVideo.autoplay = true;
        peerVideo.className = "col";
        peerVideo.setAttribute("playsinline", "playsinline");

        peerVideo.srcObject = data.streams[0];
        videoRow.appendChild(peerVideo);
        peerVideo.play();

        console.log(">>>>handing track -> on source to video");

        peerVideo.onplaying = () => {
            canvasRow.appendChild(peerCanvasGL);
            peerCanvasGL.style.zIndex = peerOrder;
            peerCanvasGL.id = myPeer.mySocketId;
            peerCanvasGL.classList.add("canvasRow");
            peerCanvasGL.style.position = "absolute";
            peerCanvasGL.style.top = "0px";
            peerCanvasGL.style.left = "0px";

            initWebGL(peerVideo, peerCanvasGL);
        };
    } else if (data.track.kind === "audio") {
        //! observer
        const observerAudio = document.getElementById("observerAudio");
        observerAudio.srcObject = data.streams[0];
        observerAudio.play();
        myPeer.mediaStream = data.streams[0];
    }
};

function makeConnection(socketId) {
    const newConnection = new RTCPeerConnection({
        iceServers: [
            {
                username: "ninefingers",
                credential: "password1",
                urls: ["turn:43.201.71.144:3478?transport=tcp"],
            },
        ],
    });

    if (socketId !== "") {
        const newPeer = new myPeer(newConnection);
        myPeers[socketId] = newPeer;
        // newPeer.mySocketId = socketId;
        newPeer["mySocketId"] = socketId;

        newConnection.addEventListener("icecandidate", handleIce);
        newConnection.addEventListener("track", data => handleTrack(data, newPeer));

        myStream.getTracks().forEach(track => {
            console.log(">>>myStream", myStream);
            newConnection.addTrack(track, myStream);
        });

        return newPeer;
    }
}

/******************************************************************* */

async function onWelcomeEvent(newSocketId) {
    console.log("[welcome] - on - client");

    const newPeer = makeConnection(newSocketId);
    const newConnection = newPeer.connection;

    // !for DataChannel : 임시 폐기
    /*
  const newAlphaChannel = newConnection.createDataChannel("alphaChannel");
  newPeer.alphaChannel = newAlphaChannel;

  console.log("newAlphaChannel", newAlphaChannel);

  newAlphaChannel.addEventListener("message", event => {
    newPeer.alphaReceived = new Uint8Array(event.data);
  });
  */

    const offer = await newConnection.createOffer();
    newConnection.setLocalDescription(offer);

    socket.emit("offer", offer, newSocketId, socket.id);
    console.log("[offer] - emit - client");
}

/******************************************************************* */
/*
function onDataChannelEvent(event, oldSocketId) {
  console.log(">>>>>dataChannel received", event.data);

  myPeers[oldSocketId].alphaChannel = event.channel;

  event.channel.addEventListener("message", event => {
    myPeers[oldSocketId].alphaReceived = new Uint8Array(event.data);
  });
}
*/
/******************************************************************* */

async function onOfferEvent(offer, oldSocketId) {
    console.log("[offer] - on - client");

    const newPeer = makeConnection(oldSocketId);
    const newConnection = newPeer.connection;

    // newConnection.ondatachannel = event => onDataChannelEvent(event, oldSocketId);

    newConnection.setRemoteDescription(offer);
    const answer = await newConnection.createAnswer();
    newConnection.setLocalDescription(answer);

    socket.emit("answer", answer, oldSocketId, socket.id);
    console.log("[answer] - emit - client");
}

/******************************************************************* */

function onAnswerEvent(answer, newSocketId) {
    console.log("[answer] - on - client");
    const connection = myPeers[newSocketId].connection;
    connection.setRemoteDescription(answer);
}

/******************************************************************* */

function onIceEvent(ice, socketId) {
    if (ice) {
        const connection = myPeers[socketId].connection;
        if (connection) {
            connection.addIceCandidate(ice);
            socket.emit("test_ice");
        }
    }
}

/******************************************************************* */

function onGoneEvent(goneSocketId) {
    store.dispatch(setVideosInfo({ value: goneSocketId }));
}

/******************************************************************* */

export async function initWebRTC() {
    socket.on("welcome", onWelcomeEvent);
    // socket.on("datachannel", onDataChannelEvent);
    socket.on("offer", onOfferEvent);
    socket.on("answer", onAnswerEvent);
    socket.on("ice", onIceEvent);
}
