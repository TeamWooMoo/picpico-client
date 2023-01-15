let socket;
let myStream;

const FRAME_RATE = 30;

let videoWidth = 400;
let videoHeight = 400;
const myVideo = document.getElementById("myVideo");
const myCanvas = document.getElementById("myCanvas");

const cameraList = [];

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

const myPeers = {};

export class myPeer {
  connection;
  videoElement;
  alphaChannel;
  alphaData;

  constructor(newConnection) {
    this.connection = newConnection;
    this.videoElement = document.createElement("video");
    this.videoElement.hidden = true;
    this.alphaChannel = null;
    this.alphaData = null;
  }
}

/***** Functions ******/

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

const handleTrack = data => {
  if (data.track.kind === "video") {
    // 실제는 두 가지 방법 중 하나로 구현될 듯
    // 1.canvas 여러 개를 겹치거나
    // 2. 하나의 canvas에 다 들어오거나
    // 현재 아래의 경우는 1번에 가깝지만, 겹치는 css는 적용되지 않음.
    // const videoRow = document.getElementById('videoRow');
    // const peerFace = document.createElement('video');
    // peerFace.autoplay = true;
    // peerFace.className = 'col';
    // peerFace.setAttribute('playsinline', 'playsinline');
    // peerFace.srcObject = data.streams[0];
    // videoRow.appendChild(peerFace);
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

    newConnection.addEventListener("icecandidate", handleIce);
    newConnection.addEventListener("track", handleTrack);

    myStream.getTracks().forEach(track => {
      newConnection.addTrack(track, myStream);
    });

    return newPeer;
  }
}

async function onWelcomeEvent(newSocketId) {
  console.log("[welcome] - on - client");

  const newPeer = makeConnection(newSocketId);
  const newConnection = newPeer.connection;
  const newAlphaChannel = newConnection.createDataChannel("alphaChannel");
  newPeer.alphaChannel = newAlphaChannel;

  newAlphaChannel.addEventListener("message", event => {
    newPeer.alphaData = new Uint8Array(event.data);
  });

  const offer = await newConnection.createOffer();
  newConnection.setLocalDescription(offer);

  socket.emit("offer", offer, newSocketId, socket.id);
  console.log("[offer] - emit - client");
}

function onDataChannelEvent(event) {}

async function onOfferEvent(offer, oldSocketId) {
  console.log("[offer] - on - client");

  const newPeer = makeConnection(oldSocketId);
  const newConnection = newPeer.connection;

  newConnection.setRemoteDescription(offer);
  const answer = await newConnection.createAnswer();
  newConnection.setLocalDescription(answer);

  socket.emit("answer", answer, oldSocketId, socket.id);
  console.log("[answer] - emit - client");
}

function onAnswerEvent(answer, newSocketId) {
  console.log("[answer] - on - client");
  const connection = myPeers[newSocketId].connection;
  connection.setRemoteDescription(answer);
}

function onIceEvent(ice, socketId) {
  if (ice) {
    const connection = myPeers[socketId].connection;
    if (connection) {
      connection.addIceCandidate(ice);
    }
  }
}

export async function initWebRTC(_socket) {
  socket = _socket;
  socket.on("welcome", onWelcomeEvent);
  socket.on("datachannel", onDataChannelEvent);
  socket.on("offer", onOfferEvent);
  socket.on("answer", onAnswerEvent);
  socket.on("ice", onIceEvent);
}
