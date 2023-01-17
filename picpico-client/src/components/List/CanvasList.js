import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTakePic } from "../../slice/takepicInfo";
import { socket } from "../../modules/sockets.mjs";
import "./CanvasList.css";

const CanvasList = () => {
  const dispatch = useDispatch();
  const imgIdx = useSelector(state => state.takepicInfo.imgIdx);
  const shuttered = useSelector(state => state.takepicInfo.takePic);

  useEffect(() => {
    if (shuttered === true) {
      const filmCanvas = document.getElementById("filmCanvas");
      const allCanvases = document.getElementById("allCanvases");
      const ctx = filmCanvas.getContext("2d");
      for (const child of allCanvases.children) {
        ctx.drawImage(child, 0, 0);
      }
      const url = filmCanvas.toDataURL();

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
        <canvas id="filmCanvas" className="canvas" width="350" height="350"></canvas>
      </div>
    </>
  );
};

export default CanvasList;
