import { cameraList, currentCamera, myGreenCanvas, myFace, myStream, myVideo } from "../controller/MainController.js";
import { segment, initSegment } from "./segment.mjs";
import { getFaceSize } from "./tracking-facesize.mjs";

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

/******************************************************************* */

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

    myStream = await myGreenCanvas.captureStream();
    console.log("myStream", myStream);
    await myStream.addTrack(mediaStream.getAudioTracks()[0]);

    console.log("capturing myGreenCanvas to stream");

    if (!deviceId) {
      return await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

/******************************************************************* */

export async function initStream() {
  myVideo = document.getElementById("myVideo");
  myGreenCanvas = document.getElementById("myGreenCanvas");

  myVideo.width = 350;
  myVideo.height = 350;
  myGreenCanvas.hidden = true;

  const canvasRow = document.getElementById("allCanvases");

  myFace = document.createElement("canvas");

  canvasRow.appendChild(myFace);
  myFace.className = "canvasRow";
  myFace.style.position = "absolute";
  myFace.style.top = "0px";
  myFace.style.left = "0px";

  myVideo.onplaying = async () => {
    myVideo.hidden = true;

    initSegment();

    myGreenCanvas.height = myVideo.height;
    myGreenCanvas.width = myVideo.width;

    let lastTime = new Date();

    async function getFrames() {
      const now = myVideo.currentTime;
      if (now > lastTime) {
        const fps = (1 / (now - lastTime)).toFixed();
        await segment(myVideo, myGreenCanvas);
      }
      lastTime = now;
      requestAnimationFrame(getFrames);
    }

    await getFrames();

    // getFaceSize();
  };

  //   await getDevices();
  await getMedia();
  // await syncStreamRTC(myStream);
  console.log("syncStreamRTC called", myStream);
}
