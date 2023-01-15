import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";

let selfieSegmentation;
let myPeers;

export function initSegment() {
  selfieSegmentation = new SelfieSegmentation({
    locateFile: file => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    },
  });
  selfieSegmentation.setOptions({ modelSelection: 1 });

  return selfieSegmentation;
}

export function syncMyPeersSegment(_myPeers) {
  myPeers = _myPeers;
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

export async function segment(videoElement, canvas) {
  selfieSegmentation.onResults(results => {
    onCanvas(results, canvas);
  });
  await selfieSegmentation.send({ image: videoElement });
}

function extractAlpha(segImageData) {
  const alphaData = segImageData.data.filter((_, i) => (i + 1) % 4 === 0);
  const alphaBuffer = new Uint8Array(alphaData);

  if (myPeers && myPeers.alphaChannel) {
    for (const [_, myPeer] of Object.entries(myPeers)) {
      if (myPeer.alphaChannel.readyState === "open") myPeer.alphaChannel.send(alphaBuffer);
    }
  }
}
