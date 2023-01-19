// {사진(낙서 포함) + 그 위의 스티커url, 스티커 좌표 } x 4
// 각 resultImage dim : 350 x 350
// 각 sticker = gif (or png)
// gif 인 경우 20 frames (각 10frames 2장)

import { decompressFrames, parseGIF } from "gifuct-js";
import { makeGIF } from "./resultGIF.mjs";

export let resultCanvas = document.createElement("canvas"); // ! 나중에 import 실제 element from component 가져와야함
export let resultImages = []; // {사진 + (각 사진 위의 스티커url, 좌표, frames) 여러개 } x 4 일 것임
export let readyToMakeGIF; // ! 컴포넌트 쪽에서 만들어야 하고 그걸 import 하는 걸로 수정 해야함

/***************************************************************** */

export class ResultImage {
  resultUrl;
  stickers; // Sticker의 배열

  constructor(_resultUrl, _stickers) {
    this.resultUrl = _resultUrl;
    this.stickers = _stickers;
  }
}

/***************************************************************** */

export class Sticker {
  stickerUrl;
  axisX;
  axisY;
  frames; // frame의 배열

  constructor(_stickerUrl, _axisX, _axisY) {
    this.stickerUrl = _stickerUrl;
    this.axisX = _axisX;
    this.axisY = _axisY;
    this.frames = null;
  }
}

/********************* frame from 'gifuct-js' *******************/
// {
//     //! The color table lookup index for each pixel
//     pixels: [...],
//     //! the dimensions of the gif frame (see disposal method)
//     dims: {
//         top: 0,
//         left: 10,
//         width: 100,
//         height: 50
//     },
//     //! the time in milliseconds that this frame should be shown
//     delay: 50,
//     //! the disposal method (see below)
//     disposalType: 1,
//     //! an array of colors that the pixel data points to
//     colorTable: [...],
//     //! An optional color index that represents transparency (see below)
//     transparentIndex: 33,
//     //! Uint8ClampedArray color converted patch information for drawing ->
//     patch: [...] // TODO : 이걸 사용해서 new ImageData 생성
//}

/***************************************************************** */
async function decodeGIF(url) {
  // console.log(">>>>>decodeGIF called");
  const promisedGif = fetch(url)
    .then(resp => resp.arrayBuffer())
    .then(buff => {
      const gif = parseGIF(buff);
      const frames = decompressFrames(gif, true);
      // console.log(">>>>>>>>>frame return");
      return frames;
    });
  return promisedGif;
}

/***************************************************************** */

// 마지막 결과화면에서 각 유저가 보게 될 다 꾸며진 그림 on canvas
// 스티커가 움직이게 그려줌
export async function makeResultCanvas() {
  let resultCtx = resultCanvas.getContext("2d");

  resultCtx.willReadFrequently = true;

  resultCanvas.width = 350;
  resultCanvas.height = 350 * 4;

  //! 자료구조 정해야 함
  // resultImages반복문 돌면서 스티커 parsing => 각 사진의 스티커목록 하나마다 frames를 연결해줌
  // currentResult[].stickerFrames = decodeGIF(eachResult [].url) => 자료구조 정해야함

  for (let imageIndex = 0; imageIndex < resultImages.length; imageIndex++) {
    let currentResult = resultImages[imageIndex];

    for (let stickerIndex = 0; stickerIndex < currentResult.stickers.length; stickerIndex++) {
      const currentSticker = currentResult.stickers[stickerIndex];
      currentSticker.frames = await decodeGIF(currentSticker.stickerUrl);
      // console.log("currentSticker.frames >>> ", currentSticker.frames);
      // setTimeout(() => decodeGIF(currentSticker.stickerUrl), 1000);
    }
  }

  // console.log(">>>>all images parsed. resultImages:", resultImages);
  let frameIndex = 0;

  const resultImgArr = [];

  for (let imageIndex = 0; imageIndex < resultImages.length; imageIndex++) {
    const currentResult = resultImages[imageIndex];
    // resultCtx = putFrame(currentResult, resultCtx, frameIndex, imageIndex);

    const resultImg = new Image();
    resultImgArr.push(resultImg);
    resultImg.src = currentResult.resultUrl;

    resultImg.onload = () => {
      resultCtx.drawImage(resultImg, 0, 350 * imageIndex);
    };
  }

  const drawResult = () => {
    resultCtx.save();

    resultCtx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);

    // resultImages 반복문 돌면서 각 eachResult 에 대해 그리기 실행
    for (let imageIndex = 0; imageIndex < resultImages.length; imageIndex++) {
      const currentResult = resultImages[imageIndex];

      resultCtx = putFrame(currentResult, resultCtx, frameIndex, imageIndex);
      resultCtx.globalCompositeOperation = "destination-over";
      resultCtx.drawImage(resultImgArr[imageIndex], 0, 350 * imageIndex);
    }

    resultCtx.restore();

    frameIndex++;

    if (readyToMakeGIF && frameIndex === 0) {
      // console.log(">>>>>>making a gif. frame #", frameIndex);
      //      captureFrame(); // 찍는 거 어딘가에 img 태그로 추가해 두게 함
      if (frameIndex === 19) {
        readyToMakeGIF = false;
        makeGIF();
      }
    }

    if (frameIndex === 19) frameIndex = 0;

    requestAnimationFrame(drawResult);
  };

  setTimeout(() => drawResult(), 1000);
  // drawResult();
}

/***************************************************************** */

// 한 사진을 올리고 그 사진에 대한 스티커들 그리기
function putFrame(currentResult, resultCtx, frameIndex, imageIndex) {
  //
  // const resultImg = new Image();
  // resultImg.src = currentResult.resultUrl;

  // resultImg.onload = () => {
  //     resultCtx.drawImage(resultImg, 0, 350 * imageIndex);
  // };

  // 해당 사진의 스티커들 반복문 돌면서 그려주기
  for (let stickerIndex = 0; stickerIndex < currentResult.stickers.length; stickerIndex++) {
    const currentSticker = currentResult.stickers[stickerIndex];
    const frames = currentSticker.frames;
    const stickerX = currentSticker.axisX;
    const stickerY = currentSticker.axisY;

    // console.log(">>>>>>currentSticker.frames", frames);
    // console.log(">>>>>>frames[frameIndex]", frames[frameIndex]);
    const stickerImageData = new ImageData(frames[frameIndex].patch, frames[frameIndex].dims.width, frames[frameIndex].dims.height);
    resultCtx.globalCompositeOperation = "destination-over";
    resultCtx.putImageData(stickerImageData, stickerX, 350 * imageIndex + stickerY);
  }

  return resultCtx;
}
