import { CREDENTIAL } from "../config.js";
import { BASE_URL } from "../config.js";
import { io } from "socket.io-client";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { setMembersInfo } from "../slice/membersInfo.js";
import { setPicturesInfo } from "../slice/picturesInfo.js";
import store from "../store.js";

/***************************************************************** */

const NewController = () => {
  let myVideo;
  let myStream;
  let myCanvas;
  let peerVideoList = [];
  let alphaReceived;
  let selfieSegmentation;
  let currentCamera = 0;

  /***************************************************************** */
  //! 아래 자료구조 바꿔서 두개 합쳐야 함
  const myPeerConnections = {};
  const alphaChannels = {};
  /***************************************************************** */

  const cameraList = [];

  const SERVER = BASE_URL;
  const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
  const socket = io(SERVER, socketOptions);

  /***************************************************************** */

  const initCall = async () => {
    await initSend();
    return await getMedia();
  };

  /***************************************************************** */

  const initSend = async () => {
    myVideo = document.getElementById("myVideo");
    myVideo.hidden = true;
    console.log("myVideo", myVideo);

    myVideo.onplaying = async () => {
      let lastTime = new Date();
      initSegment();

      async function getFrames() {
        const now = myVideo.currentTime;
        if (now > lastTime) {
          const fps = (1 / (now - lastTime)).toFixed();

          await segment(myVideo);
        }
        lastTime = now;
        requestAnimationFrame(getFrames);
      }

      await getFrames();
    };
  };

  const initSegment = () => {
    selfieSegmentation = new SelfieSegmentation({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });
    selfieSegmentation.setOptions({ modelSelection: 1 });
  };

  const segment = async videoElement => {
    selfieSegmentation.onResults(drawOnCanvas);
    await selfieSegmentation.send({ image: videoElement });
  };

  const drawOnCanvas = results => {
    let myCanvas = document.getElementById("myCanvas");
    let myCtx2d = myCanvas.getContext("2d");

    myCtx2d.willReadFrequently = true;

    myCtx2d.save();

    myCanvas.width = 400;
    myCanvas.height = 400;

    myCtx2d.clearRect(0, 0, myCanvas.width, myCanvas.height);
    myCtx2d.drawImage(results.image, 0, 0, myCanvas.width, myCanvas.height);
    // const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);

    myCtx2d.globalCompositeOperation = "destination-in";
    myCtx2d.drawImage(results.segmentationMask, 0, 0, myCanvas.width, myCanvas.height);
    const segImageData = myCtx2d.getImageData(0, 0, myCanvas.width, myCanvas.height);

    // Extract the alpha channel data
    const alphaData = segImageData.data.filter((_, i) => (i + 1) % 4 === 0); // Uint8ClampedArray
    const alphaBuffer = new Uint8Array(alphaData); // Uint8Array

    // 내 캠의 transparency 보내기
    for (const [_, channel] of Object.entries(alphaChannels)) {
      if (channel.readyState === "open") channel.send(alphaBuffer);
    }

    myCtx2d.restore();
  };

  /***************************************************************** */

  const getMedia = async deviceId => {
    myVideo = document.getElementById("myVideo");
    myCanvas = document.getElementById("myCanvas");

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
  };

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === "videoinput");
      const currentCameras = myStream.getVideoTracks()[0];

      console.log(">>>>currentCamera", currentCameras);

      cameras.forEach(camera => {
        cameraList.push(camera.deviceId);
        if (currentCameras.label === camera.label) {
          currentCamera = cameraList.indexOf(camera.deviceId);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  /********************************************************** */

  const initSocket = async () => {
    socket.on("welcome", onWelcomeEvent);
    // socket.on("coming", onComingEvent);
    socket.on("offer", onOfferEvent);
    socket.on("answer", onAnswerEvent);
    socket.on("ice", onIceEvent);
  };

  /************************************************************** */

  const onWelcomeEvent = async newSocketId => {
    console.log(">>>onWelcomeEvent", newSocketId);
    makeConnectionWelcome(newSocketId);

    const connection = myPeerConnections[newSocketId];
    const offer = await connection.createOffer();
    connection.setLocalDescription(offer);

    socket.emit("offer", offer, newSocketId, socket.id);
  };

  const makeConnectionWelcome = socketId => {
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

    if (socketId !== "") myPeerConnections[socketId] = newConnection;
    newConnection.addEventListener("icecandidate", handleIce);
    newConnection.addEventListener("track", handleTrack);

    const newAlphaChannel = newConnection.createDataChannel("alphaChannel");
    alphaChannels[socketId] = newAlphaChannel;

    newAlphaChannel.addEventListener("message", event => {
      if (typeof event.data === "string") console.log(event.data);
      else alphaReceived = new Uint8Array(event.data);
    });

    console.log(">>>>>>myStream", myStream);
    myStream.getTracks().forEach(track => {
      newConnection.addTrack(track, myStream);
    });
  };

  const handleIce = data => {
    const mySocketId = socket.id;
    for (const [peerSocketId, connection] of Object.entries(myPeerConnections)) {
      if (connection === data.target) {
        socket.emit("ice", data.candidate, peerSocketId, mySocketId);
        console.log(">>>>>emit ice", data.candidate);
        break;
      }
    }
  };

  const handleTrack = async data => {
    console.log(">>>>>>handleTrack");
    if (data.track.kind === "video") {
      console.log(">>>handling track : video !");

      const videoRow = document.getElementById("peerVideos");
      const peerVideo = document.createElement("video");

      //   peerVideo.autoplay = true;
      peerVideo.className = "col";
      peerVideo.setAttribute("playsinline", "playsinline");
      peerVideo.srcObject = data.streams[0];
      await peerVideo.play();

      peerVideo.onplaying = async () => {
        console.log(">>>>>>peerVideo on Playing !");
        initComposite(peerVideo);
      };

      console.log("appendChild in handleTrack");
      videoRow.appendChild(peerVideo);
    }
  };

  const initComposite = async peerFace => {
    peerFace.hidden = true;
    peerVideoList.push(peerFace);
    // const testCanvas = document.getElementById('testCanvas');
    // addTransparency(peerFace, testCanvas);
  };

  /************************************************************** */

  const onOfferEvent = async (offer, oldSocketId) => {
    makeConnectionOffer(oldSocketId);
    const connection = myPeerConnections[oldSocketId];
    connection.setRemoteDescription(offer);
    const answer = await connection.createAnswer();
    connection.setLocalDescription(answer);
    socket.emit("answer", answer, oldSocketId, socket.id);
  };

  const makeConnectionOffer = socketId => {
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
    if (socketId !== "") myPeerConnections[socketId] = newConnection;
    newConnection.addEventListener("icecandidate", handleIce);
    newConnection.addEventListener("track", handleTrack);
    newConnection.addEventListener("datachannel", event => {
      console.log(">>>>>>>socketId", socketId);
      console.log(">>>>>>>event", event);
      alphaChannels[socketId] = event.channel;
      console.log("received datachannel", event.channel);
      event.channel.addEventListener("message", event => {
        if (typeof event.data === "string") console.log(event.data);
        else alphaReceived = new Uint8Array(event.data);
      });
    });

    console.log(">>>>>>myStream", myStream);
    myStream.getTracks().forEach(track => {
      newConnection.addTrack(track, myStream);
      console.log(">>>>>senderEnd myStream", myStream);
    });
  };

  /***************************************************************** */

  const onAnswerEvent = (answer, newSocketId) => {
    const connection = myPeerConnections[newSocketId];
    connection.setRemoteDescription(answer);
  };

  /***************************************************************** */

  const onIceEvent = (ice, socketId) => {
    if (ice) {
      const connection = myPeerConnections[socketId];
      if (connection) {
        connection.addIceCandidate(ice);
      }
    }
  };

  /****************************************************************** */

  const joinRoomEvent = async roomId => {
    socket.emit("join_room", roomId, socket.id);

    socket.on("add_member", onAddMemberEvent);
    socket.on("done_take", onDoneTakeEvent);
  };

  const onDoneTakeEvent = imgArr => {
    store.dispatch(setPicturesInfo({ value: imgArr }));
  };

  const onAddMemberEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
  };

  /********************************************************************* */

  const addMemberEvent = async (roomId, nickname) => {
    console.log("[add member] - emit - client");
    socket.emit("add_member", roomId, nickname);
  };

  /********************************************************************* */

  const initPeerCanvas = async () => {
    addTransparency();
  };

  function addTransparency() {
    const source = peerVideoList;
    const outputCanvas = document.getElementById("peerCanvas");

    const outputCtx = outputCanvas.getContext("2d");

    outputCtx.willReadFrequently = true;

    // outputCanvas.height = source.videoHeight;
    // outputCanvas.width = source.videoWidth;
    outputCanvas.height = 400;
    outputCanvas.width = 400;

    outputCtx.globalCompositeOperation = "destination-over";

    const getImageData = () => {
      outputCtx.save();

      outputCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
      if (source.length > 0) {
        source.forEach(peerVideo => {
          const width = peerVideo.videoWidth;
          const height = peerVideo.videoHeight;

          outputCtx.drawImage(peerVideo, 0, 0, width, height);

          const imageData = outputCtx.getImageData(0, 0, width, height);
          if (alphaReceived) {
            let tmp, alphaIndex;
            for (let i = 3; i < imageData.data.length; i += 4) {
              tmp = i - 3;
              alphaIndex = tmp / 4;
              imageData.data[i] = alphaReceived[alphaIndex];
            }
          }

          outputCtx.clearRect(0, 0, width, height);
          outputCtx.putImageData(imageData, 0, 0);
          // const transparentImageData = addAlpha(imageData);
          // outputCtx.putImageData(transparentImageData, 0, 0);
        });
      }

      outputCtx.restore();

      requestAnimationFrame(getImageData);
    };

    getImageData();
  }

  /********************************************************************* */

  return {
    init: async roomId => {
      const nickName = "user";
      await initCall();
      await initSocket();
      await joinRoomEvent(roomId);
      await addMemberEvent(roomId, nickName);
      await initPeerCanvas();
    },
    takePic: imgFile => {
      socket.emit("take_pic", imgFile);
    },
    doneTake: () => {
      socket.emit("done_take");
    },
  };
};

export default NewController;
