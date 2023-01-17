import { myPeers } from "../controller/MainController.js";

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

export async function initPeerCanvas() {
  const peerCanvas = document.getElementById("peerCanvas");

  const ctx = peerCanvas.getContext("2d");

  ctx.willReadFrequently = true;

  peerCanvas.height = 250;
  peerCanvas.width = 250;

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
