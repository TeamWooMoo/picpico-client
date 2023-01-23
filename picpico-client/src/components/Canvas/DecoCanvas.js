import "./DecoCanvas.css";
import {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {socket} from "../../modules/sockets.mjs";
import {addStrokeHistory} from "../../slice/drawingInfo.js";
import {DecoDragAndDrop} from "../../modules/decoDragAndDrop.mjs";
import {FlexboxGrid, Button} from "rsuite";
import {setDecoModeInfo, setResultInfo} from "../../slice/decoInfo";
import {ResultImage, Sticker} from "../../modules/resultCanvas.mjs";
import {setDecoInfo} from "../../slice/picpicoInfo";

const DecoCanvas = () => {
    const stickerList = useSelector(state => state.decoInfo.stickerList);
    const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
    const decoData = useSelector(state => state.decoInfo.decoList);
    const doneDeco = useSelector(state => state.decoInfo.doneDeco);
    const idxArr = Object.keys(decoData);
    const dispatch = useDispatch();
    const mode = useSelector(state => state.decoInfo.decoMode);
    const [drawing, setDrawing] = useState(false);
    const strokeArr = useSelector(state => state.drawingInfo.strokes);
    const strokeHistory = useSelector(state => state.drawingInfo.strokeHistory);
    const strokeColor = useSelector(state => state.drawingInfo.strokeColor);
    const stickerPointList = useSelector(state => state.decoInfo.stickerPointList);

    // const decos = useSelector(state => state.decoInfo.decoList);
    // const decoKeys = Object.keys(decos);
    const decoColors = useSelector(state => state.decoInfo.colorList);
    const decoMapping = {};

    for (let i = 0; i < 4; i++) {
        decoMapping[idxArr[i]] = decoColors[i];
    }

    const decoEventCanvas = useRef();
    const roomId = useSelector(state => state.roomInfo.room);

    const onCanvasDown = ({nativeEvent}) => {
        setDrawing(true);
        const {offsetX, offsetY} = nativeEvent;
        socket.emit("mouse_down", socket.id, offsetX, offsetY, targetImgIdx);
    };

    const onCanvasUp = ({nativeEvent}) => {
        setDrawing(false);
        const {offsetX, offsetY} = nativeEvent;
        socket.emit("mouse_up", socket.id, offsetX, offsetY, targetImgIdx);
    };

    const onCanvasMove = ({nativeEvent}) => {
        const decoCanvas = document.getElementById(`my-${targetImgIdx}`);
        const {offsetX, offsetY} = nativeEvent;
        const decoCtx = decoCanvas.getContext("2d");
        const myLineWidth = 10;

        if (!drawing) {
            decoCtx.beginPath();
            decoCtx.moveTo(offsetX, offsetY);
        } else {
            decoCtx.lineWidth = myLineWidth;
            decoCtx.strokeStyle = strokeColor;
            decoCtx.lineTo(offsetX, offsetY);
            decoCtx.stroke();
            socket.emit("stroke_canvas", roomId, offsetX, offsetY, strokeColor, socket.id, targetImgIdx, myLineWidth);
        }
    };

    /* 최종 결과물을 GIF로 만들기 */
    useEffect(() => {
        if (doneDeco === true) {
            const resultImages = [];
            // 꾸민 사진 4개에 대해 각각 실행
            idxArr.forEach(idx => {
                const canvas = document.getElementById(`img-${idx}`); // canvas #img : 사진
                const peer = document.getElementById(`peer-${idx}`); // canvas #peer : peer drawing
                const my = document.getElementById(`my-${idx}`); // canvas #my : my drawing

                const ctx = canvas.getContext("2d");
                ctx.drawImage(peer, 0, 0);
                ctx.drawImage(my, 0, 0);

                const curImage = new ResultImage(canvas.toDataURL(), []);
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

                    console.log("axisX >> ", axisX);
                    console.log("axisY >> ", axisY);

                    const curSticker = new Sticker(url, axisX, axisY);
                    curImage.stickers.push(curSticker);
                }
                resultImages.push(curImage);
            });

            console.log("너 여기까지 오긴 하니?");
            //   dispatch(setDecoInfo({ value: true }));

            dispatch(setResultInfo({value: resultImages})); // drawing 결과 decoInfo.resultList 에 dispatch
        }
    }, [doneDeco]);

    useEffect(() => {
        console.log("mode change:", mode);
    }, [mode]);

    useEffect(() => {
        if (strokeArr.length > 0) {
            const [newX, newY, newColor, newSocketId, newIdx, newLindWidth] = strokeArr[strokeArr.length - 1];
            if (strokeHistory.hasOwnProperty(newSocketId)) {
                let {x: oldX, y: oldY, i: oldIdx, f: oldDown} = strokeHistory[newSocketId];

                const decoPeerCanvas = document.getElementById(`peer-${oldIdx}`);
                const decoCtx = decoPeerCanvas.getContext("2d");

                decoCtx.lineWidth = newLindWidth;

                if (oldDown) {
                    //mouse down
                    decoCtx.beginPath();
                    decoCtx.moveTo(oldX, oldY);
                    oldDown = !oldDown;
                } else {
                    decoCtx.strokeStyle = newColor;
                    decoCtx.lineTo(newX, newY);
                    decoCtx.stroke();
                }

                dispatch(addStrokeHistory({value: [newSocketId, newX, newY, newIdx, oldDown]}));
            }
        }
    }, [strokeArr]);

    /* 여기 해야 합니다 */
    useEffect(() => {
        if (targetImgIdx !== "") {
            dispatch(setDecoModeInfo({value: "stroke"}));

            const canvasWrapper = document.querySelector(".canvasWrapper");
            const targetDiv = document.getElementById(`set-${targetImgIdx}`);

            canvasWrapper.insertAdjacentElement("beforeend", targetDiv);

            const ctx = decoEventCanvas.current.getContext("2d");

            ctx.clearRect(0, 0, 300, 300);
        }
    }, [targetImgIdx]);

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
            const {idx: idx, url: url, stickerId: stickerId} = stickerList[stickerList.length - 1];
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
                        <div data-setid={`set-${idx}`} id={`set-${idx}`} style={{visibility: idx != targetImgIdx ? "hidden" : "visible"}}>
                            <canvas className="decocanvas" width="350px" height="350px" data-img={idx} id={`img-${idx}`}></canvas>
                            <canvas className="decocanvas" width="350px" height="350px" data-my={idx} id={`my-${idx}`}></canvas>
                            <canvas
                                className="decocanvas"
                                width="350px"
                                height="350px"
                                data-peer={idx}
                                id={`peer-${idx}`}
                                style={{border: `3px solid ${decoMapping[idx]}`}}
                            ></canvas>
                            <div className="decocanvas" id={`sticker-${idx}`} style={{position: "absolute", width: "350px", height: "350px"}}></div>
                        </div>
                    ))}
                </div>
                <canvas
                    className="decocanvas"
                    width="350px"
                    height="350px"
                    ref={decoEventCanvas}
                    onMouseDown={onCanvasDown}
                    onMouseMove={onCanvasMove}
                    onMouseUp={onCanvasUp}
                    style={{border: `3px solid ${decoMapping[targetImgIdx]}`, visibility: mode === "sticker" ? "hidden" : "visible"}}
                ></canvas>
            </FlexboxGrid>
        </>
    );
};

export default DecoCanvas;
