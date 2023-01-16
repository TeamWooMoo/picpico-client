import store from "../store.js";

import { setVideosInfo } from "../slice/videosInfo.js";
import { myPeer, myPeers, myStream } from "../controller/MainController.js";
import { socket } from "./sockets.mjs";

/* myPeers
 *    key    :    value
 *
 * socketId  :    myPeer
 *            {
 *                connection   :
 *                videoElement :
 *                alphaChannel :
 *                alphaData    :
 *            }
 */

// const myPeers = {};

// export class myPeer {
//   connection;
//   videoElement;
//   alphaChannel;
//   alphaData;

//   constructor(newConnection) {
//     this.connection = newConnection;
//     this.videoElement = document.createElement("video");
//     this.videoElement.hidden = true;
//     this.alphaChannel = null;
//     this.alphaData = null;
//   }
// }
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

    const videoRow = document.getElementById("peerVideos");
    const peerVideo = myPeer.videoElement;

    console.log(peerVideo);
    peerVideo.hidden = true;
    peerVideo.muted = true;
    peerVideo.autoplay = true;
    peerVideo.className = "col";
    peerVideo.setAttribute("playsinline", "playsinline");

    peerVideo.srcObject = data.streams[0];
    videoRow.appendChild(peerVideo);
    peerVideo.play();
    console.log(">>>>data throughRTC", data);
    console.log(">>>>data.streams throughRTC", data.streams[0]);
    console.log(">>>>peerVideo");
    console.log(">>>>handing track -> on source to video");
  }
};

function makeConnection(socketId) {
  const newConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });

  if (socketId !== "") {
    const newPeer = new myPeer(newConnection);
    myPeers[socketId] = newPeer;

    // syncMyPeers();

    newConnection.addEventListener("icecandidate", handleIce);
    newConnection.addEventListener("track", data => handleTrack(data, newPeer));

    // myStream = getMyStream();

    myStream.getTracks().forEach(track => {
      console.log(">>>myStream", myStream);
      newConnection.addTrack(track, myStream);
    });

    // const testVideo = document.createElement("video");
    // testVideo.srcObject = myStream;

    return newPeer;
  }
}

/******************************************************************* */

async function onWelcomeEvent(newSocketId) {
  console.log("[welcome] - on - client");

  const newPeer = makeConnection(newSocketId);
  const newConnection = newPeer.connection;
  const newAlphaChannel = newConnection.createDataChannel("alphaChannel");
  newPeer.alphaChannel = newAlphaChannel;

  console.log("onWelcome : connection", newConnection);
  console.log("newAlphaChannel", newAlphaChannel);
  console.log("me : ", socket.id);

  newAlphaChannel.addEventListener("message", event => {
    newPeer.alphaReceived = new Uint8Array(event.data);
  });

  const offer = await newConnection.createOffer();
  newConnection.setLocalDescription(offer);

  socket.emit("offer", offer, newSocketId, socket.id);
  console.log("[offer] - emit - client");
}

/******************************************************************* */

function onDataChannelEvent(event, oldSocketId) {
  console.log(">>>>>dataChannel received", event.data);

  myPeers[oldSocketId].alphaChannel = event.channel;

  event.channel.addEventListener("message", event => {
    myPeers[oldSocketId].alphaReceived = new Uint8Array(event.data);
  });
}

/******************************************************************* */

async function onOfferEvent(offer, oldSocketId) {
  console.log("[offer] - on - client");

  const newPeer = makeConnection(oldSocketId);
  const newConnection = newPeer.connection;

  //   newConnection.addEventListener("datachannel", event => onDataChannelEvent(event, oldSocketId));
  //   newConnection.addEventListener("datachannel", event => console.log(">>>datachannel", event.channel));
  newConnection.ondatachannel = event => onDataChannelEvent(event, oldSocketId);

  console.log("onOffer : connection", newConnection);
  console.log("me :", socket.id);

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
    }
  }
}

/******************************************************************* */

function onGoneEvent(goneSocketId) {
  store.dispatch(setVideosInfo(goneSocketId));
}
export async function initWebRTC() {
  socket.on("welcome", onWelcomeEvent);
  socket.on("datachannel", onDataChannelEvent);
  socket.on("offer", onOfferEvent);
  socket.on("answer", onAnswerEvent);
  socket.on("ice", onIceEvent);
  socket.on("gone", onGoneEvent);
}
