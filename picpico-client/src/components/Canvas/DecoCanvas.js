import "./DecoCanvas.css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { addStrokeHistory } from "../../slice/drawingInfo.js";
import { DecoDragAndDrop } from "../../modules/decoDragAndDrop.mjs";
import { FlexboxGrid, Button } from "rsuite";

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
    dragAndDrop.reset();
  };

  const onStickerBtnClick = () => {
    setMode("sticker");
    dragAndDrop.init();
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

  const dragAndDrop = DecoDragAndDrop();
  // dragAndDrop.init();
  // useEffect(() => {
  // }, []);

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
        <canvas className="decocanvas" ref={decoPeerCanvas}></canvas>
        <canvas
          className="decocanvas"
          ref={decoMyCanvas}
          width="300px"
          height="300px"
          onMouseDown={onCanvasDown}
          onMouseMove={onCanvasMove}
          onMouseUp={onCanvasUp}
        ></canvas>
        <div className="decocanvas" id="sticker_field" style={{ position: "absolute", width: "300px", height: "300px" }}>
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
        {mode === "stroke" ? (
          <canvas className="decocanvas" ref={decoEventCanvas} onMouseDown={onCanvasDown} onMouseMove={onCanvasMove} onMouseUp={onCanvasUp}></canvas>
        ) : null}
      </FlexboxGrid>
    </>
  );
};

export default DecoCanvas;
