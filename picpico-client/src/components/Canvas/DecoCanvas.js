import "./DecoCanvas.css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { addStrokeHistory } from "../../slice/drawingInfo.js";
import { DecoDragAndDrop } from "../../modules/decoDragAndDrop.mjs";
import { FlexboxGrid, Button } from "rsuite";
import { setDecoModeInfo, setResultInfo } from "../../slice/decoInfo";
import { ResultImage, Sticker } from "../../modules/resultCanvas.mjs";

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

  // const decos = useSelector(state => state.decoInfo.decoList);
  // const decoKeys = Object.keys(decos);
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

  const onCanvasUp = () => {
    setDrawing(false);
  };

  const onCanvasMove = ({ nativeEvent }) => {
    const decoCanvas = document.getElementById(`my-${targetImgIdx}`);
    const { offsetX, offsetY } = nativeEvent;
    const decoCtx = decoCanvas.getContext("2d");
    if (!drawing) {
      decoCtx.beginPath();
      decoCtx.moveTo(offsetX, offsetY);
    } else {
      decoCtx.strokeStyle = strokeColor;
      decoCtx.lineTo(offsetX, offsetY);
      decoCtx.stroke();
      socket.emit("stroke_canvas", roomId, offsetX, offsetY, strokeColor, socket.id, targetImgIdx);
    }
  };

  /* 최종 결과물을 GIF로 만들기 */
  useEffect(() => {
    if (doneDeco === true) {
      const resultImages = [];
      idxArr.forEach(idx => {
        const canvas = document.getElementById(`img-${idx}`);
        const peer = document.getElementById(`peer-${idx}`);
        const my = document.getElementById(`my-${idx}`);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(peer, 0, 0);
        ctx.drawImage(my, 0, 0);

        const curImage = new ResultImage(canvas.toDataURL(), []);
        // 스티커 넣어줘야함
        // for문 돌면서
        // const curSticker =  new Sticker('sticker_url', 'axisX', 'axisY');
        // curImage.stickers.push(curSticker)
        resultImages.push(curImage);
      });

      dispatch(setResultInfo({ value: resultImages }));
    }
  }, [doneDeco]);

  useEffect(() => {
    console.log("mode change");
  }, [mode]);

  useEffect(() => {
    if (strokeArr.length > 0) {
      const [newX, newY, newColor, newSocketId, newIdx] = strokeArr[strokeArr.length - 1];
      if (strokeHistory.hasOwnProperty(newSocketId)) {
        const { x: oldX, y: oldY, i: oldIdx } = strokeHistory[newSocketId];
        const decoPeerCanvas = document.getElementById(`peer-${oldIdx}`);
        const decoCtx = decoPeerCanvas.getContext("2d");
        decoCtx.beginPath();
        decoCtx.moveTo(oldX, oldY);
        decoCtx.lineTo(newX, newY);
        decoCtx.strokeStyle = newColor;
        decoCtx.stroke();
        dispatch(addStrokeHistory({ value: [newSocketId, newX, newY, newIdx] }));
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

  //   const dragAndDrop = DecoDragAndDrop();

  /* 스티커를 스티커 필드 위에 올리기 */
  useEffect(() => {
    if (stickerList.length > 0) {
      const { idx: idx, url: url } = stickerList[stickerList.length - 1];
      const stickerField = document.getElementById(`sticker-${idx}`);

      // 스티커의 div태그
      // 스티커를 draggable하게 만들어줌
      const newStickerDiv = document.createElement("div");
      newStickerDiv.className = "draggable";
      newStickerDiv.style.position = "absolute";
      newStickerDiv.style.height = "100px";
      newStickerDiv.style.width = "100px";

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

  return (
    <>
      <FlexboxGrid className="DecoCanvasBox">
        <div className="canvasWrapper">
          {idxArr.map(idx => (
            <div data-setid={`set-${idx}`} id={`set-${idx}`} style={{ visibility: idx != targetImgIdx ? "hidden" : "visible" }}>
              <canvas className="decocanvas" width="300px" height="300px" data-img={idx} id={`img-${idx}`}></canvas>
              <canvas className="decocanvas" width="300px" height="300px" data-my={idx} id={`my-${idx}`}></canvas>
              <canvas
                className="decocanvas"
                width="300px"
                height="300px"
                data-peer={idx}
                id={`peer-${idx}`}
                style={{ border: `2px solid ${decoMapping[idx]}` }}
              ></canvas>
              <div className="decocanvas" id={`sticker-${idx}`} style={{ position: "absolute", width: "300px", height: "300px" }}>
                {/* <div class="draggable" style={{ position: "absolute", width: "100px", height: "100px" }}>
                                <img
                                  alt="sticker1"
                                  src="https://i.pinimg.com/originals/18/11/30/181130c64c246318e1e4d463d1844ed7.gif"
                                  // class="draggable"
                                  style={{ position: "absolute", width: "100px", height: "100px" }}
                                />
                              </div>
                              <div class="draggable" style={{ position: "absolute", width: "100px", height: "100px" }}>
                                <img
                                  alt="sticker2"
                                  src="https://storage.cobak.co/uploads/1585038492476558_8eeec6050c.gif"
                                  // class="draggable"
                                  style={{ position: "absolute", width: "100px", height: "100px" }}
                                />
                              </div> */}
              </div>
            </div>
          ))}

          {mode === "stroke" ? (
            <canvas
              className="decocanvas"
              width="300px"
              height="300px"
              ref={decoEventCanvas}
              onMouseDown={onCanvasDown}
              onMouseMove={onCanvasMove}
              onMouseUp={onCanvasUp}
              style={{ border: `2px solid ${decoMapping[targetImgIdx]}` }}
            ></canvas>
          ) : null}
        </div>
      </FlexboxGrid>
    </>
  );
};

export default DecoCanvas;
