import { initSegment, segment } from "./segment.mjs";
import { syncStreamRTC } from "./webRTC.mjs";

let myVideo;
let myCanvas;
let myStream;
let currentCamera;
const cameraList = [];
let myPeers;

export async function syncMyPeersStream(_myPeers) {
  myPeers = _myPeers;
}

export async function initStream() {
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
  await syncStreamRTC();
}

// export function getMyStream() {
//   return myStream;
// }
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

    if (!deviceId) {
      return await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

function changeCamera() {}
