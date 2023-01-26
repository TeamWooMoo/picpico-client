import { myPeer, myPeers } from "../controller/MainController.js";
import { joinRoom, socket } from "./sockets.mjs";

let obMediaStream;

export async function initObserver(roomId) {
    await obInitStream();
    await joinRoom(roomId);
    await obInitWebRTC();
}

async function obInitStream() {
    await obGetMedia();
}

async function obGetMedia() {
    const obInitialConstraints = {
        audio: true,
    };

    try {
        obMediaStream = await navigator.mediaDevices.getUserMedia(obInitialConstraints);
    } catch (e) {
        console.log(e);
    }
}

function obInitWebRTC() {
    socket.on("welcome", obOnWelcomeEvent);
    socket.on("offer", obOnOfferEvent);
    socket.on("answer", obOnAnswerEvent);
    socket.on("ice", obOnIceEvent);
}

async function obOnWelcomeEvent(newSocketId) {
    console.log("[welcome] - on - client");

    const newPeer = obMakeConnection(newSocketId);
    const newConnection = newPeer.connection;

    const offer = await newConnection.createOffer();
    newConnection.setLocalDescription(offer);

    socket.emit("offer", offer, newSocketId, socket.id);
    console.log("[offer] - emit - client");
}

function obMakeConnection(socketId) {
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
        newPeer["mySocketId"] = socketId;

        newConnection.addEventListener("icecandidate", obHandleIce);
        newConnection.addEventListener("track", data => obHandleTrack(data, newPeer));

        obMediaStream.getTracks().forEach(track => {
            console.log(">>>obMediaStream", obMediaStream);
            newConnection.addTrack(track, obMediaStream);
        });

        return newPeer;
    }
}

const obHandleIce = data => {
    const mySocketId = socket.id;
    for (const [peerSocketId, myPeer] of Object.entries(myPeers)) {
        if (myPeer.connection === data.target) {
            console.log("[ice] - emit - client");
            socket.emit("ice", data.candidate, peerSocketId, mySocketId);
            break;
        }
    }
};

const obHandleTrack = (data, myPeer) => {
    console.log(">>>>handling track");
    if (data.track.kind === "video") {
        console.log(">>>handling track : video !");

        console.log("observer data", data.streams[0]);

        const peerAudio = myPeer.obAudioElement;
        const obPeerAudioRow = document.getElementById("obPeerAudioRow");
        obPeerAudioRow.appendChild(peerAudio);

        peerAudio.srcObject = data.streams[0];
        peerAudio.play();

        myPeer.mediaStream = data.streams[0];
    }
};

async function obOnOfferEvent(offer, oldSocketId) {
    console.log("[offer] - on - client");

    const newPeer = obMakeConnection(oldSocketId);
    const newConnection = newPeer.connection;

    newConnection.setRemoteDescription(offer);
    const answer = await newConnection.createAnswer();
    newConnection.setLocalDescription(answer);

    socket.emit("answer", answer, oldSocketId, socket.id);
    console.log("[answer] - emit - client");
}

function obOnAnswerEvent(answer, newSocketId) {
    console.log("[answer] - on - client");
    const connection = myPeers[newSocketId].connection;
    connection.setRemoteDescription(answer);
}

function obOnIceEvent(ice, socketId) {
    if (ice) {
        const connection = myPeers[socketId].connection;
        if (connection) {
            connection.addIceCandidate(ice);
            socket.emit("test_ice");
        }
    }
}
