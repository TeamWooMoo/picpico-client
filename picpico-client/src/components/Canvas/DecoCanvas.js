import "./DecoCanvas.css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { addStrokeHistory } from "../../slice/drawingInfo.js";
import { FlexboxGrid } from "rsuite";
import { setDecoModeInfo, setResultInfo } from "../../slice/decoInfo";
import { ResultImage, Sticker } from "../../modules/resultCanvas.mjs";
import { isMobile } from "react-device-detect";
import star from "../../assets/images/background-star.png";
import water from "../../assets/images/background-water.png";

const DecoCanvas = () => {
    const dispatch = useDispatch();
    const stickerList = useSelector(state => state.decoInfo.stickerList);
    const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
    const decoData = useSelector(state => state.decoInfo.decoList);
    const doneDeco = useSelector(state => state.decoInfo.doneDeco);
    const idxArr = Object.keys(decoData);
    const mode = useSelector(state => state.decoInfo.decoMode);
    const [drawing, setDrawing] = useState(false);
    const strokeArr = useSelector(state => state.drawingInfo.strokes);
    const strokeHistory = useSelector(state => state.drawingInfo.strokeHistory);
    const strokeColor = useSelector(state => state.drawingInfo.strokeColor);
    const stickerPointList = useSelector(state => state.decoInfo.stickerPointList);
    const bgList = useSelector(state => state.decoInfo.bgList);
    const bgSrcList = ["", star, water];

    const decoColors = useSelector(state => state.decoInfo.colorList);
    const decoMapping = {};

    for (let i = 0; i < 4; i++) {
        decoMapping[idxArr[i]] = decoColors[i];
    }

    const decoEventCanvas = useRef();
    const roomId = useSelector(state => state.roomInfo.room);

    const onCanvasDown = ({ nativeEvent }) => {
        setDrawing(true);
        const { offsetX, offsetY } = nativeEvent;
        socket.emit("mouse_down", socket.id, offsetX, offsetY, targetImgIdx);
    };

    const onCanvasUp = ({ nativeEvent }) => {
        setDrawing(false);
        const { offsetX, offsetY } = nativeEvent;
        socket.emit("mouse_up", socket.id, offsetX, offsetY, targetImgIdx);
    };

    const onCanvasMove = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const myLineWidth = 5;

        if (drawing) {
            socket.emit("stroke_canvas", roomId, offsetX, offsetY, strokeColor, socket.id, targetImgIdx, myLineWidth);
        }
    };

    const [isDrag, setIsDrag] = useState(false);
    const [touchStartPositionX, setTouchStartPositionX] = useState(null);
    const [touchStartPositionY, setTouchStartPositionY] = useState(null);
    const [touchEndPositionX, setTouchEndPositionX] = useState(null);
    const [touchEndPositionY, setTouchEndPositionY] = useState(null);

    const setEventTouch = e => {
        switch (e.type) {
            case "touchstart":
                setIsDrag(true);
                setTouchStartPositionX(e.changedTouches[0].clientX);
                setTouchStartPositionY(e.changedTouches[0].clientY - 100);
                socket.emit("mouse_down", socket.id, touchStartPositionX, touchStartPositionY, targetImgIdx);
                break;
            case "touchmove":
                if (isDrag) {
                    const myLineWidth = 5;
                    socket.emit(
                        "stroke_canvas",
                        roomId,
                        e.changedTouches[0].clientX,
                        e.changedTouches[0].clientY - 100,
                        strokeColor,
                        socket.id,
                        targetImgIdx,
                        myLineWidth
                    );
                }
                break;
            case "touchend":
                setIsDrag(false);
                setTouchEndPositionX(e.changedTouches[0].clientX);
                setTouchEndPositionY(e.changedTouches[0].clientY - 100);
                socket.emit("mouse_up", socket.id, touchEndPositionX, touchEndPositionY, targetImgIdx);
                break;
            case "mousedown":
                e.preventDefault();
                break;
            case "mouseup":
                e.preventDefault();
                break;
            case "mousemove":
                e.preventDefault();
                break;
            default:
        }
    };

    /* 최종 결과물을 GIF로 만들기 */
    useEffect(() => {
        if (doneDeco === true) {
            const resultImages = [];
            // 꾸민 사진 4개에 대해 각각 실행
            idxArr.forEach(idx => {
                const bg = document.getElementById(`bg-${idx}`);
                const canvas = document.getElementById(`img-${idx}`); // canvas #img : 사진
                const peer = document.getElementById(`peer-${idx}`); // canvas #peer : peer drawing
                const my = document.getElementById(`my-${idx}`); // canvas #my : my drawing

                const ctx = bg.getContext("2d");
                ctx.drawImage(canvas, 0, 0);
                ctx.drawImage(peer, 0, 0);
                ctx.drawImage(my, 0, 0);

                const curImage = new ResultImage(bg.toDataURL(), []);
                // 스티커 넣어줘야함
                const curImageStickerField = document.getElementById(`sticker-${idx}`);
                const stickers = curImageStickerField.children; // div

                // for문 돌면서
                for (let i = 0; i < stickers.length; i++) {
                    const url = stickers[i].children[0].src; // div > img
                    let axisX = parseInt(stickers[i].style.top.split("px")[0]);
                    let axisY = parseInt(stickers[i].style.left.split("px")[0]);

                    axisX = isNaN(axisX) ? 0 : axisX;
                    axisY = isNaN(axisY) ? 0 : axisY;

                    const curSticker = new Sticker(url, axisX, axisY);
                    curImage.stickers.push(curSticker);
                }
                resultImages.push(curImage);
            });

            dispatch(setResultInfo({ value: resultImages })); // drawing 결과 decoInfo.resultList 에 dispatch
            socket.emit("submit_deco");
            console.log("client emit submit deco");
        }
    }, [doneDeco]);

    useEffect(() => {
        if (strokeArr.length > 0) {
            const [newX, newY, newColor, newSocketId, newIdx, newLindWidth] = strokeArr[strokeArr.length - 1];
            if (strokeHistory.hasOwnProperty(newSocketId)) {
                let { x: oldX, y: oldY, i: oldIdx, c: oldColor, f: oldDown } = strokeHistory[newSocketId];

                const decoPeerCanvas = document.getElementById(`peer-${oldIdx}`);
                const decoCtx = decoPeerCanvas.getContext("2d");

                decoCtx.lineWidth = newLindWidth;

                decoCtx.beginPath();
                decoCtx.moveTo(oldX, oldY);
                decoCtx.strokeStyle = newColor;
                decoCtx.lineJoin = "round";
                decoCtx.lineTo(newX, newY);
                decoCtx.stroke();
                dispatch(addStrokeHistory({ value: [newSocketId, newX, newY, newIdx, newColor, oldDown] }));
            }
        }
    }, [strokeArr]);

    /* 여기 해야 합니다 */
    useEffect(() => {
        if (targetImgIdx !== "") {
            dispatch(setDecoModeInfo({ value: "stroke" }));

            const canvasWrapper = document.querySelector(".canvasWrapper");
            const targetDiv = document.getElementById(`set-${targetImgIdx}`);

            canvasWrapper.insertAdjacentElement("beforeend", targetDiv);

            const ctx = decoEventCanvas.current.getContext("2d");

            ctx.clearRect(0, 0, 300, 300);
        }
    }, [targetImgIdx]);

    useEffect(() => {
        if (bgList.length === 1) {
            console.log("bgList:", bgList, bgList.length);
            const [bgIdx, setIdx] = bgList[0];
            console.log(setIdx, document.getElementById(`bg-${setIdx}`));
            const bgCanvas = document.getElementById(`bg-${setIdx}`);
            const bgCtx = bgCanvas.getContext("2d");

            console.log("bgIdx:", bgIdx, ", setIdx: ", setIdx);
            if (bgIdx === 0) {
                bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            } else {
                const src = bgSrcList[bgIdx];
                const img = new Image();

                console.log("src: ", src);
                img.onload = function () {
                    bgCtx.drawImage(img, 0, 0);
                };
                img.src = src;
            }
        } else {
            console.log("bg length:", bgList.length);
        }
    }, [bgList]);

    useEffect(() => {
        idxArr.forEach(idx => {
            const imgCanvas = document.getElementById(`img-${idx}`);
            const imgCtx = imgCanvas.getContext("2d");

            const newImg = new Image();

            newImg.src = decoData[idx]["picture"];

            newImg.onload = async function () {
                await imgCtx.drawImage(newImg, 0, 0);
            };
        });
    }, []);

    /* 스티커를 스티커 필드 위에 올리기 */
    useEffect(() => {
        if (stickerList.length > 0) {
            const { idx: idx, url: url, stickerId: stickerId } = stickerList[stickerList.length - 1];
            const stickerField = document.getElementById(`sticker-${idx}`);

            console.log("stickerField.children >>> ", stickerField.children);

            // 스티커의 div태그
            // 스티커를 draggable하게 만들어줌
            const newStickerDiv = document.createElement("div");
            newStickerDiv.className = "draggable";
            newStickerDiv.style.position = "absolute";
            newStickerDiv.style.height = "100px";
            newStickerDiv.style.width = "100px";
            newStickerDiv.id = stickerId;

            // 스티커의 img태그
            // 이미지 소스가 담김
            const newStickerImg = document.createElement("img");
            newStickerImg.alt = "sticker2";
            newStickerImg.src = url;
            newStickerImg.style.position = "absolute";
            newStickerImg.style.width = "100px";
            newStickerImg.style.height = "100px";

            /* <div> <img/> </div> */
            newStickerDiv.appendChild(newStickerImg);

            /* <div id=`sticker-${idx}`> <div> <img/> </div> </div> */
            stickerField.appendChild(newStickerDiv);
        }
    }, [stickerList]);

    useEffect(() => {
        if (stickerPointList.length > 0) {
            const [left, top, stickerId] = stickerPointList[stickerPointList.length - 1];
            const targetSticker = document.getElementById(stickerId);
            targetSticker.style.left = left;
            targetSticker.style.top = top;
        }
    }, [stickerPointList]);

    return (
        <>
            <FlexboxGrid className="DecoCanvasBox">
                <div className="canvasWrapper">
                    {idxArr.map(idx => (
                        <div data-setid={`set-${idx}`} id={`set-${idx}`} style={{ visibility: idx != targetImgIdx ? "hidden" : "visible" }}>
                            <canvas className="decocanvas" width="350px" height="350px" id={`bg-${idx}`}></canvas>
                            <canvas className="decocanvas" width="350px" height="350px" data-img={idx} id={`img-${idx}`}></canvas>
                            <canvas className="decocanvas" width="350px" height="350px" data-my={idx} id={`my-${idx}`}></canvas>
                            <canvas
                                className="decocanvas"
                                width="345px"
                                height="345px"
                                data-peer={idx}
                                id={`peer-${idx}`}
                                style={{ border: `3px solid ${decoMapping[idx]}` }}
                            ></canvas>
                            <div className="decocanvas" id={`sticker-${idx}`} style={{ position: "absolute", width: "350px", height: "350px" }}></div>
                        </div>
                    ))}
                </div>
                {/* {isMobile ? (
                    <canvas
                        className="decocanvas"
                        width="345px"
                        height="345px"
                        ref={decoEventCanvas}
                        onTouchStart={setEventTouch}
                        onTouchEnd={setEventTouch}
                        onTouchMove={setEventTouch}
                        style={{ border: `10px solid ${decoMapping[targetImgIdx]}`, visibility: mode === "sticker" ? "hidden" : "visible" }}
                    ></canvas>
                ) : (
                    <canvas
                        className="decocanvas"
                        width="345px"
                        height="345px"
                        ref={decoEventCanvas}
                        onMouseDown={onCanvasDown}
                        onMouseMove={onCanvasMove}
                        onMouseUp={onCanvasUp}
                        style={{ border: `3px solid ${decoMapping[targetImgIdx]}`, visibility: mode === "sticker" ? "hidden" : "visible" }}
                    ></canvas>
                )} */}
                <canvas
                    className="decocanvas"
                    width="345px"
                    height="345px"
                    ref={decoEventCanvas}
                    onMouseDown={onCanvasDown}
                    onMouseMove={onCanvasMove}
                    onMouseUp={onCanvasUp}
                    style={{ border: `3px solid ${decoMapping[targetImgIdx]}`, visibility: mode === "sticker" ? "hidden" : "visible" }}
                ></canvas>
            </FlexboxGrid>
        </>
    );
};

export default DecoCanvas;
