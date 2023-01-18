// {사진(낙서 포함) + 그 위의 스티커url, 스티커 좌표 } x 4
// 각 사진 dim : 350 x 350
// 각 sticker = gif or png
// gif 인 경우 20 frames (각 10frames 2장)

import { decompressFrames, parseGIF } from "gifuct-js";

let resultCanvas = document.createElement("canvas"); // 나중에 import 실제 element from component 가져와야함
let resultImages = []; // {사진 + (각 사진 위의 스티커url, 좌표, frames) 여러개 } x 4 일 것임

function decodeGIF(url) {
  const promisedGif = fetch(url)
    .then(resp => resp.arrayBuffer())
    .then(buff => {
      const gif = parseGIF(buff);
      const frames = decompressFrames(gif, true);

      return frames;
    });
}

function makeResultCanvas() {
  const resultCtx = resultCanvas.getContext("2d");

  resultCtx.willReadFrequently = true;

  resultCanvas.width = 350;
  resultCanvas.height = 350 * 4;

  //! 자료구조 정해야 함
  // resultImages반복문 돌면서 스티커 parsing
  // eachResult[].stickerFrames = decodeGIF(eachResult [].url) => 자료구조 정해야함

  // let frameIndex = 0

  const drawResult = () => {
    resultCtx.save();

    // resultCtx.clearRect();
    //
    // resultImages 반복문 돌면서 각 eachResult 에 대해 그리기 실행
    // for(let i = 0; i< resultImages.length; i++ )
    // {
    //     const eachResult = resultImages[i];
    //     resultCtx = putFrame(eachResult, resultCtx, frameIndex, i)
    // }

    resultCtx.restore();

    // frameIndex++;
    // if(frameIndex == 20) frameIndex = 0;

    // if(frameIndex == 0 && flagMakeFramePNG)
    // {
    //      captureFrame();
    //      if(frameIndex == 20) {
    //          flagMakeFramePNG = false;
    //          makeGIF();
    //      }
    // }

    requestAnimationFrame(drawResult);
  };

  drawResult();
}

// 한 사진을 올리고 그 사진에 대한 스티커들 그리기
function putFrame(eachResult, resultCtx, frameIndex, imageIndex) {
  //
  // resultCtx.drawImage(eachResult.사진, 0, 350*imageIndex)
  //
  // 해당 사진의 스티커들 반복문 돌면서 그려주기
  // for()
  // {
  //    const frames = eachResult.frames;
  //    const stickerX = eachResult.axisX;
  //    const stickerY = eachResult.axisY;
  //    const stickerImageData = new ImageData(frames[frameIndex].patch, frames[frameIndex].dims.width, frames[frameIndex].dims.height);
  //
  //    resultCtx.putImageData(stickerImageData, stickerX, 350*imageIndex + stickerY);
  // }
}
