import { io } from 'socket.io-client';
import { CREDENTIAL } from '../config';
import store from '../store';
import { setMembersInfo } from '../slice/membersInfo';
import { setPicturesInfo } from '../slice/picturesInfo';
// import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
// import { isClassStaticBlockDeclaration } from "typescript";

const SERVER = 'https://picpico-server.site';
const socketOptions = { withCredentials: CREDENTIAL.withCredentials };

const WebrtcController = () => {
  let socket = io(SERVER, socketOptions);
  let myStream;
  const myPeerConnections = {};
  const cameraList = [];
  let selfieSegmentation;
  let currentCamera = 0;

  //   const _onResults = (results) => {
  //     let canvas = document.getElementById("myCanvas");
  //     let canvasCtx = canvas.getContext("2d");
  //     canvasCtx.save();

  //     canvas.width = "400";
  //     canvas.height = "400";

  //     canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  //     canvasCtx.drawImage(
  //       results.segmentationMask,
  //       0,
  //       0,
  //       canvas.width,
  //       canvas.height
  //     );

  //     canvasCtx.globalCompositeOperation = "source-out";
  //     canvasCtx.fillStyle = "#FFFFFF";
  //     canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  //     canvasCtx.globalCompositeOperation = "source-out";
  //     canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  //     canvasCtx.restore();
  //   };

  //   const initSegment = () => {
  //     selfieSegmentation = new SelfieSegmentation({
  //       locateFile: (file) => {
  //         return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
  //       },
  //     });
  //     selfieSegmentation.setOptions({ modelSelection: 1 });
  //   };

  //   const segment = async (videoElement) => {
  //     selfieSegmentation.onResults(_onResults);
  //     await selfieSegmentation.send({ image: videoElement });
  //   };

  //   const initSend = async () => {
  //     const myFace = document.getElementById("myFace");
  //     console.log("myFace", myFace);

  //     myFace.onplaying = async () => {
  //       let lastTime = new Date();
  //       initSegment();

  //       async function getFrames() {
  //         const now = myFace.currentTime;
  //         if (now > lastTime) {
  //           const fps = (1 / (now - lastTime)).toFixed();

  //           await segment(myFace);
  //         }
  //         lastTime = now;
  //         requestAnimationFrame(getFrames);
  //       }

  //       await getFrames();
  //     };
  //   };

  //   const getMedia = async (deviceId) => {
  //     const myFace = document.getElementById("myFace");
  //     const myCanvas = document.getElementById("myCanvas");
  //     const initialConstraints = {
  //       audio: true,
  //       video: { facingMod: "user" },
  //     };
  //     const cameraConstraints = {
  //       audio: true,
  //       video: { deviceId: { exact: deviceId } },
  //     };
  //     try {
  //       let videoStream = await navigator.mediaDevices.getUserMedia(
  //         deviceId ? cameraConstraints : initialConstraints
  //       );
  //       myFace.srcObject = videoStream;

  //       await myFace.play();
  //       myStream = await myCanvas.captureStream();
  //       await myStream.addTrack(videoStream.getAudioTracks()[0]);

  //       if (!deviceId) {
  //         await getCameras();
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const getCameras = async () => {
  //     try {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const cameras = devices.filter((device) => device.kind === "videoinput");
  //       const currentCameras = myStream.getVideoTracks()[0];
  //       cameras.forEach((camera) => {
  //         cameraList.push(camera.deviceId);
  //         if (currentCameras.label === camera.label) {
  //           currentCamera = cameraList.indexOf(camera.deviceId);
  //         }
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const makeConnection = socketId => {
    const newConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ],
        },
      ],
    });
    if (socketId !== '') myPeerConnections[socketId] = newConnection;
    newConnection.addEventListener('icecandidate', handleIce);
    newConnection.addEventListener('track', handleTrack);

    myStream.getTracks().forEach(track => {
      newConnection.addTrack(track, myStream);
    });
  };

  const handleIce = data => {
    const mySocketId = socket.id;
    for (const [peerSocketId, connection] of Object.entries(myPeerConnections)) {
      if (connection === data.target) {
        console.log('[ice] - emit - client');
        socket.emit('ice', data.candidate, peerSocketId, mySocketId);
        break;
      }
    }
  };

  const handleTrack = data => {
    if (data.track.kind === 'video') {
      // 실제는 두 가지 방법 중 하나로 구현될 듯
      // 1.canvas 여러 개를 겹치거나
      // 2. 하나의 canvas에 다 들어오거나
      // 현재 아래의 경우는 1번에 가깝지만, 겹치는 css는 적용되지 않음.
      const videoRow = document.getElementById('videoRow');
      const peerFace = document.createElement('video');
      peerFace.autoplay = true;
      peerFace.className = 'col';
      peerFace.setAttribute('playsinline', 'playsinline');
      peerFace.srcObject = data.streams[0];
      videoRow.appendChild(peerFace);
    }
  };

  //   const initCall = async () => {
  //     await initSend();
  //     await getMedia();
  //   };

  const initSocket = async () => {
    socket.on('welcome', onWelcomeEvent);
    socket.on('offer', onOfferEvent);
    socket.on('answer', onAnswerEvent);
    socket.on('ice', onIceEvent);
    socket.on('add_member', onAddMemberEvent);
    // socket.on('render_member', onRenderMemberEvent);
    socket.on('done_take', onDoneTakeEvent);
  };

  const onDataChannelEvent = async event => {};

  const joinRoomEvent = async roomId => {
    socket.emit('join_room', roomId, socket.id);
    console.log('[join room] - emit - client');
  };

  const addMemberEvent = async (roomId, nickname) => {
    console.log('[add member] - emit - client');
    socket.emit('add_member', roomId, nickname);
  };

  const onWelcomeEvent = async newSocketId => {
    console.log('[welcome] - on - client');
    makeConnection(newSocketId);
    const connection = myPeerConnections[newSocketId];
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    socket.emit('offer', offer, newSocketId, socket.id);
    console.log('[offer] - emit - client');
  };

  const onOfferEvent = async (offer, oldSocketId) => {
    console.log('[offer] - on - client');
    makeConnection(oldSocketId);
    const connection = myPeerConnections[oldSocketId];
    connection.setRemoteDescription(offer);
    const answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);
    socket.emit('answer', answer, oldSocketId, socket.id);
    console.log('[answer] - emit - client');
  };

  const onAnswerEvent = (answer, newSocketId) => {
    console.log('[answer] - on - client');
    const connection = myPeerConnections[newSocketId];
    connection.setRemoteDescription(answer);
  };

  const onIceEvent = (ice, socketId) => {
    if (ice) {
      const connection = myPeerConnections[socketId];
      if (connection) {
        connection.addIceCandidate(ice);
      }
    }
  };

  const onDoneTakeEvent = imgArr => {
    store.dispatch(setPicturesInfo({ value: imgArr }));
  };

  const onAddMemberEvent = nicknameArr => {
    store.dispatch(setMembersInfo({ value: nicknameArr }));
  };
  return {
    init: async roomId => {
      // socket = io(SERVER, socketOptions);
      // await initCall();
      const nickname = 'user';
      socket.on('connect', async () => {
        await initSocket();
        await joinRoomEvent(roomId);
        await addMemberEvent(roomId, nickname);
      });
    },
    takePic: imgFile => {
      socket.emit('take_pic', imgFile);
    },
    doneTake: () => {
      socket.emit('done_take');
    },
  };
};

export default WebrtcController;
