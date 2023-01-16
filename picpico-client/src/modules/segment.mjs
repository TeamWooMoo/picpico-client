import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { myPeers, selfieSegmentation } from "../controller/MainController.js";

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
        let chunkSize = 1024 * 1024 * 16;
        const dataChannel = myPeer.alphaChannel;

        const alphaSend = () => {
          while (buffer && buffer.byteLength) {
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

        if (buffer) {
          console.log(">>>>>>>buffer", buffer);
          alphaSend();
        }

        // console.log(">>>>>extracting Alpha :sending ! ");
      }
    }
  }
}

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

export function initSegment() {
  selfieSegmentation = new SelfieSegmentation({
    locateFile: file => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    },
  });
  selfieSegmentation.setOptions({ modelSelection: 1 });

  //   return selfieSegmentation;
}

export async function segment(videoElement, canvas) {
  selfieSegmentation.onResults(results => {
    onCanvas(results, canvas);
  });
  await selfieSegmentation.send({ image: videoElement });
}
