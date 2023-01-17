import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setImgIdxCount, setTakePic } from "../../slice/takepicInfo";
import { socket } from "../../modules/sockets.mjs";
import "./CanvasList.css";

const CanvasList = () => {
  const dispatch = useDispatch();
  const myCanvas = useRef();
  const imgIdx = useSelector(state => state.takepicInfo.imgIdx);
  const shuttered = useSelector(state => state.takepicInfo.takePic);

  useEffect(() => {
    if (shuttered === true) {
      // dispatch(setImgIdxCount({ value: imgIdx + 1 }));
      const url = myCanvas.current.toDataURL();

      if (typeof imgIdx === "string") {
        socket.emit("take_pic", (parseInt(imgIdx) + 1).toString(), url);
      } else {
        socket.emit("take_pic", (imgIdx + 1).toString(), url);
      }
      dispatch(setTakePic({ value: false }));
    }
  }, [shuttered]);

  return (
    <>
      <div className="canvasBox">
        <canvas id="myCanvas" className="canvas" ref={myCanvas} width="100" height="100"></canvas>
        <canvas id="peerCanvas" className="canvas"></canvas>
      </div>
    </>
  );
};

export default CanvasList;
