import { CREDENTIAL } from "../config.js";
import { BASE_URL } from "../config.js";
import { io } from "socket.io-client";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { setMembersInfo } from "../slice/membersInfo.js";
import { setPicturesInfo } from "../slice/picturesInfo.js";
import store from "../store.js";

/******************************************************************* */

const MainController = () => {
  let socket;
  let myVideo;
  let myCanvas;
  let myStream;
  let selfieSegmentation;
  let currentCamera;
  const cameraList = [];

  /******************************************************************* */

  const myPeers = {};

  class myPeer {
    connection;
    videoElement;
    alphaChannel;
    alphaReceived;

    constructor(newConnection) {
      this.connection = newConnection;
      this.videoElement = document.createElement("video");
      this.videoElement.hidden = true;
      this.alphaChannel = null;
      this.alphaReceived = null;
    }
  }

  /******************************************************************* */

  function getSocket() {
    const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
    const SERVER = BASE_URL;

    socket = io(SERVER, socketOptions);
    return socket;
  }

  /******************************************************************* */

  function extractAlpha(segImageData) {
    const alphaData = segImageData.data.filter((_, i) => (i + 1) % 4 === 0);
    const alphaBuffer = new Uint8Array(alphaData);
    // console.log(">>>>>extracting Alpha", myPeers);
    if (myPeers) {
      for (const [_, myPeer] of Object.entries(myPeers)) {
        //   console.log(">>>>>extracting Alpha : myPeer", myPeer);
        if (myPeer.alphaChannel && myPeer.alphaChannel.readyState === "open") {
          // myPeer.alphaChannel.send(alphaBuffer);
          let buffer = alphaBuffer;

          const alphaSend = (dataChannel, chunkSize) => {
            while (buffer.byteLength) {
              if (dataChannel.bufferedAmount > dataChannel.bufferedAmountLowThreshold) {
                dataChannel.onbufferedamountlow = () => {
                  dataChannel.onbufferedamountlow = null;
                  alphaSend(dataChannel, chunkSize);
                };
                return;
              }

              const chunk = buffer.slice(0, chunkSize);
              buffer = buffer.slice(chunkSize, buffer.byteLength);
              dataChannel.send(chunk);
            }
          };

          alphaSend(myPeer.alphaChannel, 1024 * 1024 * 16);

          // console.log(">>>>>extracting Alpha :sending ! ");
        }
      }
    }
  }

  const alphaSend = (dataChannel, buffer, chunkSize) => {
    while (buffer.byteLength) {
      if (dataChannel.bufferedAmount > dataChannel.bufferedAmountLowThreshold) {
        dataChannel.onbufferedamountlow = () => {
          dataChannel.onbufferedamountlow = null;
          alphaSend();
        };
        return;
      }
      const chunk = buffer.slice(0, chunkSize);
      buffer = buffer.slice(chunkSize, buffer.byteLength);
      dataChannel.send(chunk);
    }
  };
  alphaSend();

  function onCanvas(results, canvas) {
    let ctx = canvas.getContext("2d");

    ctx.willReadFrequently = true;

    ctx.save();

    canvas.width = 400;
    canvas.height = 400;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);
    const segImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    extractAlpha(segImageData);

    ctx.restore();
  }

  async function segment(videoElement, canvas) {
    selfieSegmentation.onResults(results => {
      onCanvas(results, canvas);
    });
    await selfieSegmentation.send({ image: videoElement });
  }

  /******************************************************************* */

  function initSegment() {
    selfieSegmentation = new SelfieSegmentation({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });
    selfieSegmentation.setOptions({ modelSelection: 1 });

    //   return selfieSegmentation;
  }

  /******************************************************************* */

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === "videoinput");
      const currentCameras = myStream.getVideoTracks()[0];
      // console.log(">>>>currentCamera", currentCameras);

      cameras.forEach(camera => {
        cameraList.push(camera.deviceId);
        if (currentCameras.label === camera.label) {
          currentCamera = cameraList.indexOf(camera.deviceId);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getMedia(deviceId) {
    const initialConstraints = {
      audio: true,
      video: { facingMod: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };

    try {
      let mediaStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstraints);
      myVideo.srcObject = mediaStream;

      await myVideo.play();

      myStream = await myCanvas.captureStream();
      await myStream.addTrack(mediaStream.getAudioTracks()[0]);

      console.log("capturing myCanvas to stream");

      if (!deviceId) {
        return await getCameras();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function initStream() {
    myVideo = document.getElementById("myVideo");
    myCanvas = document.getElementById("myCanvas");

    myVideo.onplaying = async () => {
      myVideo.hidden = true;

      initSegment();

      myCanvas.height = myVideo.height;
      myCanvas.width = myVideo.width;

      let lastTime = new Date();

      async function getFrames() {
        const now = myVideo.currentTime;
        if (now > lastTime) {
          const fps = (1 / (now - lastTime)).toFixed();
          await segment(myVideo, myCanvas);
        }
        lastTime = now;
        requestAnimationFrame(getFrames);
      }

      await getFrames();
    };

    //   await getDevices();
    await getMedia();
    // await syncStreamRTC(myStream);
    console.log("syncStreamRTC called", myStream);
  }

  /******************************************************************* */

  const onDoneTakeEvent = imgArr => {
    store.dispatch(setPicturesInfo({ value: imgArr }));
  };

  const onAddMemberEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
  };

  async function joinRoom(socket, roomId) {
    socket.emit("join_room", roomId, socket.id);
    console.log("[join room] - emit - client");

    socket.on("add_member", onAddMemberEvent);
    socket.on("done_take", onDoneTakeEvent);
  }

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

  async function initWebRTC(_socket) {
    socket = _socket;
    socket.on("welcome", onWelcomeEvent);
    socket.on("offer", onOfferEvent);
    socket.on("answer", onAnswerEvent);
    socket.on("ice", onIceEvent);
  }

  /******************************************************************* */

  const addMemberEvent = async (roomId, nickname) => {
    console.log("[add member] - emit - client");
    socket.emit("add_member", roomId, nickname);
  };

  /******************************************************************* */

  function addAlpha(imageData, alphaReceived, piledAlpha) {
    let tmp;
    let alphaIndex;
    for (let i = 3; i < imageData.data.length; i += 4) {
      tmp = i - 3;
      alphaIndex = tmp / 4;

      piledAlpha[alphaIndex] += alphaReceived[alphaIndex];

      imageData.data[i] = piledAlpha[alphaIndex];
    }

    return { imageData, piledAlpha };
  }

  async function initPeerCanvas() {
    const peerCanvas = document.getElementById("peerCanvas");

    const ctx = peerCanvas.getContext("2d");

    ctx.willReadFrequently = true;

    peerCanvas.height = 400;
    peerCanvas.width = 400;

    // 먼저 그려지는 context 가 제일 위에 올라옴
    ctx.globalCompositeOperation = "destination-over";

    // myPeers의 myPeer를 순회 하면서 한 canvas위에 모두 그림
    const drawPeers = () => {
      ctx.save();

      ctx.clearRect(0, 0, peerCanvas.width, peerCanvas.height);

      if (myPeers) {
        // alphaData 와 videoElem이 모두 null이 아닌 peer들을 그림
        const ALPHA_LENGTH = 160000; // hard corded for now
        let piledAlpha = new Uint8Array(ALPHA_LENGTH);

        for (const [_, myPeer] of Object.entries(myPeers)) {
          if (myPeer.videoElement && myPeer.alphaReceived) {
            ctx.drawImage(myPeer.videoElement, 0, 0, peerCanvas.width, peerCanvas.height);
            const imageData = ctx.getImageData(0, 0, peerCanvas.width, peerCanvas.height);

            const result = addAlpha(imageData, myPeer.alphaReceived, piledAlpha);
            const segImageData = result.imageData;
            piledAlpha = result.piledAlpha;

            ctx.clearRect(0, 0, peerCanvas.width, peerCanvas.height);
            ctx.putImageData(segImageData, 0, 0);
          }
        }
      }

      ctx.restore();

      requestAnimationFrame(drawPeers);
    };

    drawPeers();
  }

  /******************************************************************* */

  const init = async (roomId, nickName) => {
    socket = getSocket();
    socket.on("connect", async () => {
      await initStream();
      await joinRoom(socket, roomId);
      await initWebRTC(socket);
      await addMemberEvent(roomId, nickName);
      await initPeerCanvas();
    });
  };

  /******************************************************************* */

  return {
    init: async roomId => {
      const nickName = "user";
      await init(roomId, nickName);
    },
    takePic: imgFile => {
      socket.emit("take_pic", imgFile);
    },
    doneTake: () => {
      socket.emit("done_take");
    },
  };
};

export default MainController;
