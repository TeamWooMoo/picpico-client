import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { addStrokeHistory } from "../../slice/drawingInfo.js";
import { DecoDragAndDrop } from "../../modules/decoDragAndDrop.mjs";
import "./DecoCanvas.css";

const DecoCanvas = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("stroke");
  const [drawing, setDrawing] = useState(false);
  const strokeArr = useSelector(state => state.drawingInfo.strokes);
  const strokeHistory = useSelector(state => state.drawingInfo.strokeHistory);
  const strokeColor = useSelector(state => state.drawingInfo.strokeColor);
  const decoMyCanvas = useRef();
  const decoPeerCanvas = useRef();
  const decoEventCanvas = useRef();

  const roomId = useSelector(state => state.roomInfo.room);

  const onCanvasDown = ({ nativeEvent }) => {
    console.log("down");
    setDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    socket.emit("mouse_down", socket.id, offsetX, offsetY);
  };

  const onCanvasUp = () => {
    console.log("up");
    setDrawing(false);
  };

  const onCanvasMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const decoCtx = decoMyCanvas.current.getContext("2d");
    if (!drawing) {
      decoCtx.beginPath();
      decoCtx.moveTo(offsetX, offsetY);
    } else {
      decoCtx.strokeStyle = strokeColor;
      decoCtx.lineTo(offsetX, offsetY);
      decoCtx.stroke();
      socket.emit("stroke_canvas", roomId, offsetX, offsetY, strokeColor, socket.id);
    }
  };

  const onStrokeBtnClick = () => {
    setMode("stroke");
  };

  const onStickerBtnClick = () => {
    setMode("sticker");
  };

  useEffect(() => {
    if (strokeArr.length > 0) {
      const [newX, newY, newColor, newSocketId] = strokeArr[strokeArr.length - 1];
      if (strokeHistory.hasOwnProperty(newSocketId)) {
        const { x: oldX, y: oldY } = strokeHistory[newSocketId];
        const decoCtx = decoPeerCanvas.current.getContext("2d");
        decoCtx.beginPath();
        decoCtx.moveTo(oldX, oldY);

        decoCtx.lineTo(newX, newY);
        decoCtx.strokeStyle = newColor;
        decoCtx.stroke();

        dispatch(addStrokeHistory({ value: [newSocketId, newX, newY] }));
      }
    }
  }, [strokeArr]);

  useEffect(() => {
    const dragAndDrop = DecoDragAndDrop();
    dragAndDrop.init();
  }, []);

  return (
    <>
      <FlexboxGrid justify="center">
        <button onClick={onStrokeBtnClick}>그리기</button>
        <button onClick={onStickerBtnClick}>스티커</button>
      </FlexboxGrid>
      <div className="canvasBox">
        <canvas className="canvas" ref={decoPeerCanvas} width="350px" height="350px"></canvas>
        <canvas className="canvas" ref={decoMyCanvas} onMouseDown={onCanvasDown} onMouseMove={onCanvasMove} onMouseUp={onCanvasUp}></canvas>
        <div id="sticker_field" style={{ position: "absolute", top: "0px", left: "0px", width: "502px", height: "502px" }}>
          <img
            alt="sticker1"
            src="https://i.pinimg.com/originals/18/11/30/181130c64c246318e1e4d463d1844ed7.gif"
            class="draggable"
            style={{ position: "absolute", width: "100px", height: "100px" }}
          />
          <img
            alt="sticker2"
            src="https://storage.cobak.co/uploads/1585038492476558_8eeec6050c.gif"
            class="draggable"
            style={{ position: "absolute", width: "100px", height: "100px" }}
          />
        </div>
        {mode === "stroke" ? (
          <canvas ref={decoEventCanvas} width="350px" height="350px" onMouseDown={onCanvasDown} onMouseMove={onCanvasMove} onMouseUp={onCanvasUp}></canvas>
        ) : null}
      </div>
    </>
  );
};

export default DecoCanvas;
