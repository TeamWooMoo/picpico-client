import { useRef, useEffect, useState } from "react";

const DecoCanvas = ({ controller }) => {
  const [drawing, setDrawing] = useState(false);
  const decoCanvas = useRef();

  const onCanvasDown = event => {
    setDrawing(true);
  };

  const onCanvasUp = event => {
    setDrawing(false);
  };

  const onCanvasMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const decoCtx = decoCanvas.current.getContext("2d");
    if (!drawing) {
      decoCtx.beginPath();
      decoCtx.moveTo(offsetX, offsetY);
    } else {
      decoCtx.lineTo(offsetX, offsetY);
      decoCtx.stroke();
    }
  };

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
