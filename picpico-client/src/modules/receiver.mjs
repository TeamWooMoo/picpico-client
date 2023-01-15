let myPeers;

export function syncMyPeersReceiver(_myPeers) {
  myPeers = _myPeers;
}

function addAlpha(imageData, alphaReceived) {
  let tmp;
  let alphaIndex;
  for (let i = 3; i < imageData.data.length; i += 4) {
    tmp = i - 3;
    alphaIndex = tmp / 4;
    imageData.data[i] = alphaReceived[alphaIndex];
  }
}

export async function initPeerCanvas() {
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
      console.log("mypeer exists");
      for (const [_, myPeer] of Object.entries(myPeers)) {
        if (myPeer.videoElement && myPeer.alphaReceived) {
          console.log("drawing on");
          ctx.drawImage(myPeer.videoElement, 0, 0, peerCanvas.width, peerCanvas.height);
          const imageData = ctx.getImageData(0, 0, peerCanvas.width, peerCanvas.height);

          addAlpha(imageData, myPeer.alphaReceived);

          ctx.clearRect(0, 0, peerCanvas.width, peerCanvas.height);
          ctx.putImageData(imageData, 0, 0);
        }
      }
    }

    ctx.restore();

    requestAnimationFrame(drawPeers);
  };

  drawPeers();
}
