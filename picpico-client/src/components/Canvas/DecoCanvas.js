import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { addStrokeHistory } from "../../slice/drawingInfo.js";
import "./DecoCanvas.css";

const DecoCanvas = () => {
  const dispatch = useDispatch();
  const [drawing, setDrawing] = useState(false);
  const strokeArr = useSelector(state => state.drawingInfo.strokes);
  const strokeHistory = useSelector(state => state.drawingInfo.strokeHistory);
  const strokeColor = useSelector(state => state.drawingInfo.strokeColor);
  const decoMyCanvas = useRef();
  const decoPeerCanvas = useRef();

  const roomId = useSelector(state => state.roomInfo.room);

  const onCanvasDown = ({ nativeEvent }) => {
    setDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    socket.emit("mouse_down", socket.id, offsetX, offsetY);
  };

  const onCanvasUp = () => {
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

  return (
    <div className="canvasBox">
      <div style={{ position: "relative" }}>
        <canvas ref={decoPeerCanvas} width="200" height="200" style={{ position: "absolute", top: "0px", left: "0px" }}></canvas>
        <canvas
          ref={decoMyCanvas}
          width="200"
          height="200"
          style={{ position: "absolute", top: "0px", left: "0px", border: "2px solid white" }}
          onMouseDown={onCanvasDown}
          onMouseMove={onCanvasMove}
          onMouseUp={onCanvasUp}
        ></canvas>
      </div>
    </div>
  );
};

export default DecoCanvas;
