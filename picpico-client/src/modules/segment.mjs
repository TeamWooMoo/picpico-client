import {SelfieSegmentation} from "@mediapipe/selfie_segmentation";
import {myFace, myPeers, selfieSegmentation} from "../controller/MainController.js";
import {getFaceSize} from "./tracking-facesize.mjs";

function onCanvas(results, canvas) {
    let ctx = canvas.getContext("2d");
    let myCtx = myFace.getContext("2d");

    /****** */

    myCtx.willReadFrequently = true;

    myCtx.save();

    myFace.width = 350;
    myFace.height = 350;

    myCtx.scale(-1, 1);
    myCtx.translate(-350, 0); // 350은 캔버스 가로 길이

    myCtx.clearRect(0, 0, canvas.width, canvas.height);
    myCtx.drawImage(results.image, 0, 0, myFace.width, myFace.height);

    // if (results.image) {
    //   // console.log("results.image <- must not be undefined", results.image);
    //   const img = myCtx.getImageData(0, 0, myFace.width, myFace.height);
    //   getFaceSize(img);
    // }

    myCtx.globalCompositeOperation = "destination-in";
    myCtx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);

    myCtx.restore();

    /****** */

    ctx.willReadFrequently = true;

    ctx.save();

    canvas.width = 350;
    canvas.height = 350;
    ctx.scale(-1, 1);
    ctx.translate(-350, 0); // 350은 캔버스 가로 길이

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);

    /******************* For DataChannel : 임시 폐기 ********************/
    // const segImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // extractAlpha(segImageData);
    /******************************************************************/

    /*************************** For WebGL ****************************/

    // TODO : green으로 칠하기 전에 배경 제거된 imageData -> 나를 위한 새로운 canvas에 그려줘야함 (Green canvas로 captureStream 하기 때문)

    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgb(0,255,0)"; // rgb(0,255,0)
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    /******************************************************************/

    ctx.restore();
}

export function initSegment() {
    selfieSegmentation = new SelfieSegmentation({
        locateFile: file => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
        },
    });

    selfieSegmentation.setOptions({modelSelection: 1});
}

export async function segment(videoElement, canvas) {
    selfieSegmentation.onResults(results => {
        onCanvas(results, canvas);
    });

    await selfieSegmentation.send({image: videoElement});
}

//! 임시 폐기
function extractAlpha(segImageData) {
    const alphaData = segImageData.data.filter((_, i) => (i + 1) % 4 === 0);
    const alphaBuffer = new Uint8Array(alphaData);

    if (myPeers) {
        for (const [_, myPeer] of Object.entries(myPeers)) {
            if (myPeer.alphaChannel && myPeer.alphaChannel.readyState === "open") {
                let buffer = alphaBuffer;
                let chunkSize = 1024 * 1024 * 16;
                const dataChannel = myPeer.alphaChannel;

                // alphaSend : Robust send (chunk 로 보내서 dataChannel overflow 방지)
                //! delay 심해서 실시간 cam 화면을 위한 uint8array 전달에는 못씀 ... -> multi-datachannel 구현 시도 예정
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
                    alphaSend();
                }
            }
        }
    }
}
