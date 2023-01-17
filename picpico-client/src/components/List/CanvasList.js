import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setImgIdxCount, setTakePic } from "../../slice/takepicInfo";
import { socket } from "../../modules/sockets.mjs";
import "./CanvasList.css";

const CanvasList = () => {
  const dispatch = useDispatch();
  const filmCanvas = useRef();
  const mirrorCanvas = useRef();
  const testCanvas = useRef();
  const imgIdx = useSelector(state => state.takepicInfo.imgIdx);
  const shuttered = useSelector(state => state.takepicInfo.takePic);

  // useEffect(()=>{
  //   const ctx = testCanvas.current.getContext("2d");
  //   ctx.fillStyle="blue";
  //   ctx.fillRect(0, 0, 350, 350);
  // }, [])

  useEffect(() => {
    if (shuttered === true) {
      // dispatch(setImgIdxCount({ value: imgIdx + 1 }));

      const url = mirrorCanvas.current.toDataURL();
      const ctx = filmCanvas.current.getContext("2d");

      if (typeof imgIdx === "string") {
        socket.emit("take_pic", (parseInt(imgIdx) + 1).toString(), url);
      } else {
        socket.emit("take_pic", (imgIdx + 1).toString(), url);
      }
      dispatch(setTakePic({ value: false }));

      ctx.clearRect(0, 0, 350, 350);
    }
  }, [shuttered]);

  return (
    <>
      <div className="canvasBox">
        <canvas id="myGreenCanvas" className="canvas"></canvas>
        <div id="allCanvases"></div>
        {/* <canvas id="testCanvas" className="canvas" ref={testCanvas} width="350" height="350"></canvas> */}
        <canvas id="mirrorCanvas" className="canvas" ref={mirrorCanvas} width="350" height="350"></canvas>
        <canvas id="filmCanvas" className="canvas" ref={filmCanvas} width="350" height="350"></canvas>
      </div>
    </>
  );
};

export default CanvasList;
