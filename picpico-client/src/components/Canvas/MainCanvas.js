import { useRef } from "react";

const MainCanvas = () => {
  const canvas = useRef();
  return (
    <>
      <canvas ref={canvas} width="500" height="500"></canvas>
    </>
  );
};

export default MainCanvas;
