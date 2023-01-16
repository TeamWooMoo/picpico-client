import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
const DecoCanvas = () => {
  const [drawing, setDrawing] = useState(false);
  const strokeArr = useSelector(state => state.drawingInfo.strokes);
  const decoCanvas = useRef();
  const roomId = useSelector(state => state.roomInfo.room);

  const onCanvasDown = () => {
    setDrawing(true);
  };

  const onCanvasUp = () => {
    setDrawing(false);
  };

  const onCanvasMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const decoCtx = decoCanvas.current.getContext("2d");
    if (!drawing) {
      decoCtx.beginPath();
      decoCtx.moveTo(offsetX, offsetY);
    } else {
      decoCtx.strokeStyle = "black";
      decoCtx.lineTo(offsetX, offsetY);
      decoCtx.stroke();
      console.log("그리는 애만 나와야 해");
      socket.emit("stroke_canvas", roomId, offsetX, offsetY);
      // controller.strokeCanvas(roomId, offsetX, offsetY);
    }
  };

  useEffect(() => {
    if (strokeArr.length > 0) {
      console.log("듣는 애만 나와야 해");
      const [receivedX, receivedY] = strokeArr[strokeArr.length - 1];
      console.log(receivedX, receivedY);
      const decoCtx = decoCanvas.current.getContext("2d");
      // decoCtx.beginPath();
      decoCtx.lineTo(receivedX, receivedY);
      decoCtx.strokeStyle = "white";
      decoCtx.stroke();
      decoCtx.beginPath();
      decoCtx.moveTo(receivedX, receivedY);
    }
  }, [strokeArr]);

  return (
    <>
      <canvas
        ref={decoCanvas}
        width="500"
        height="500"
        style={{ border: "2px solid white" }}
        onMouseDown={onCanvasDown}
        onMouseMove={onCanvasMove}
        onMouseUp={onCanvasUp}
      ></canvas>
    </>
  );
};

export default DecoCanvas;
