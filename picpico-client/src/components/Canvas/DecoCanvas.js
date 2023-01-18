import "./DecoCanvas.css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { addStrokeHistory } from "../../slice/drawingInfo.js";
import { DecoDragAndDrop } from "../../modules/decoDragAndDrop.mjs";
import { FlexboxGrid, Button } from "rsuite";

const DecoCanvas = () => {
  const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
  const decoData = useSelector(state => state.decoInfo.decoList);
  const dispatch = useDispatch();
  const [mode, setMode] = useState("stroke");
  const [drawing, setDrawing] = useState(false);
  const strokeArr = useSelector(state => state.drawingInfo.strokes);
  const strokeHistory = useSelector(state => state.drawingInfo.strokeHistory);
  const strokeColor = useSelector(state => state.drawingInfo.strokeColor);

  // const decoMyCanvas = useRef();
  // const decoPeerCanvas = useRef();
  const decoEventCanvas = useRef();

  const roomId = useSelector(state => state.roomInfo.room);

  const onCanvasDown = ({ nativeEvent }) => {
    console.log("down:", nativeEvent);
    console.log("down");
    setDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    socket.emit("mouse_down", socket.id, offsetX, offsetY);
  };

  const onCanvasUp = ({ nativeEvent }) => {
    console.log("up:", nativeEvent);
    console.log("up");
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

  const onStrokeBtnClick = () => {
    setMode("stroke");
    dragAndDrop.reset(targetImgIdx);
  };

  const onStickerBtnClick = () => {
    setMode("sticker");
    dragAndDrop.init(targetImgIdx);
  };

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
      console.log("targetImgIdx:", targetImgIdx);
      console.log("decoData", decoData);
      const canvasWrapper = document.querySelector(".canvasWrapper");
      const targetDiv = document.getElementById(`set-${targetImgIdx}`);
      canvasWrapper.insertAdjacentElement("beforeend", targetDiv);
      const ctx = decoEventCanvas.current.getContext("2d");
      // ctx.clearRect(0, 0, 300, 300);
    }
  }, [targetImgIdx]);

  useEffect(() => {
    const idxArr = Object.keys(decoData);
    console.log("idxARR: ", idxArr);
    idxArr.forEach(idx => {
      console.log("idx:", idx);
      const imgCanvas = document.getElementById(`img-${idx}`);
      const imgCtx = imgCanvas.getContext("2d");

      const newImg = new Image();

      console.log(">>><<<>>>", decoData[idx]["picture"]);
      newImg.src = decoData[idx]["picture"];
      newImg.onload = async function () {
        await imgCtx.drawImage(newImg, 0, 0);
      };
    });
  }, []);

  const dragAndDrop = DecoDragAndDrop();

  return (
    <>
      <FlexboxGrid>
        <Button appearance="default" onClick={onStrokeBtnClick}>
          그리기
        </Button>
        <Button appearance="default" onClick={onStickerBtnClick}>
          스티커
        </Button>
      </FlexboxGrid>
      <FlexboxGrid className="DecoCanvasBox">
        <div className="canvasWrapper">
          {Object.keys(decoData).forEach(idx => {
            <div data-setid={`set-${idx}`} id={`set-${idx}`}>
              <canvas className="decocanvas" width="300px" height="300px" data-img={idx} id={`img-${idx}`}></canvas>
              <canvas className="decocanvas" width="300px" height="300px" data-my={idx} id={`my-${idx}`}></canvas>
              <canvas className="decocanvas" width="300px" height="300px" data-peer={idx} id={`peer-${idx}`}></canvas>
              <div className="decocanvas" id={`sticker-${idx}`} style={{ position: "absolute", width: "300px", height: "300px" }}>
                <div class="draggable" style={{ position: "absolute", width: "100px", height: "100px" }}>
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
                </div>
              </div>
            </div>;
          })}

          {mode === "stroke" ? (
            <canvas
              className="decocanvas"
              width="300px"
              height="300px"
              ref={decoEventCanvas}
              onMouseDown={onCanvasDown}
              onMouseMove={onCanvasMove}
              onMouseUp={onCanvasUp}
            ></canvas>
          ) : null}
        </div>
      </FlexboxGrid>
    </>
  );
};

export default DecoCanvas;
