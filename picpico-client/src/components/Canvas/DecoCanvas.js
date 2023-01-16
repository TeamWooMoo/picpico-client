import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
const DecoCanvas = () => {
  const [drawing, setDrawing] = useState(false);
  const strokeArr = useSelector(state => state.drawingInfo.strokes);
  const strokeHistory = useSelector(state => state.drawingInfo.strokeHistory);
  const decoMyCanvas = useRef();
  const decoPeerCanvas = useRef();
  const roomId = useSelector(state => state.roomInfo.room);

  const onCanvasDown = ({ nativeEvent }) => {
    setDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    socket.emit("mouse_down", socket.id, offsetX, offsetY);
  };

  const onCanvasUp = ({ nativeEvent }) => {
    setDrawing(false);
    socket.emit("mouse_up", socket.id);
  };

  const onCanvasMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const decoCtx = decoMyCanvas.current.getContext("2d");
    if (!drawing) {
      decoCtx.beginPath();
      decoCtx.moveTo(offsetX, offsetY);
    } else {
      decoCtx.strokeStyle = "black";
      decoCtx.lineTo(offsetX, offsetY);
      decoCtx.stroke();
      console.log("그리는 애만 나와야 해");
      socket.emit("stroke_canvas", roomId, offsetX, offsetY, "white", socket.id);
      // controller.strokeCanvas(roomId, offsetX, offsetY);
    }
  };

  useEffect(() => {
    if (strokeArr.length > 0) {
      console.log("듣는 애만 나와야 해");
      // 현재 그릴 애들
      const [newX, newY, newColor, newSocketId] = strokeArr[strokeArr.length - 1];
      const { x: oldX, y: oldY } = strokeHistory[newSocketId];
      const decoCtx = decoPeerCanvas.current.getContext("2d");
      decoCtx.beginPath();
      decoCtx.moveTo(oldX, oldY);

      decoCtx.lineTo(newX, newY);
      decoCtx.strokeStyle = newColor;
      decoCtx.stroke();
    }
  }, [strokeArr]);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={decoPeerCanvas} width="500" height="500" style={{ position: "absolute", top: "0px", left: "0px" }}></canvas>
      <canvas
        ref={decoMyCanvas}
        width="500"
        height="500"
        style={{ position: "absolute", top: "0px", left: "0px", border: "2px solid white" }}
        onMouseDown={onCanvasDown}
        onMouseMove={onCanvasMove}
        onMouseUp={onCanvasUp}
      ></canvas>
    </div>
  );
};

export default DecoCanvas;
