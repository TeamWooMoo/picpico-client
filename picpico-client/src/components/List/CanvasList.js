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
      const bgCanvas = document.getElementById("bgCanvas");
      const bgCtx = bgCanvas.getContext("2d");
      bgCtx.fillStyle = "red";
      bgCtx.fillRect(0, 0, 350, 350);
      const filmCanvas = document.getElementById("filmCanvas"); // canvas
      const allCanvases = document.getElementById("allCanvases"); // div
      const ctx = filmCanvas.getContext("2d");
      ctx.drawImage(bgCanvas, 0, 0);

      const videoRow = document.getElementById("peerVideos");

      for (const child of allCanvases.children) {
        // const img = new Image();
        // img.src = child.toDataURL();
        // console.log("img:", img);
        // ctx.drawImage(img, 0, 0);

        const newCanvas = document.createElement("canvas");
        const newCtx = newCanvas.getContext("2d");

        videoRow.appendChild(newCanvas);

        const childCtx = child.getContext("2d");
        const childImage = childCtx.getImageData(0, 0, 350, 350);
        newCanvas.width = 350;
        newCanvas.height = 350;

        newCtx.clearRect(0, 0, 350, 350);
        newCtx.putImageData(childImage, 0, 0);

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
        <canvas id="bgCanvas" className="canvas" width="350" height="350"></canvas>
        <canvas id="myGreenCanvas" className="canvas"></canvas>
        <div id="allCanvases"></div>
        <canvas id="filmCanvas" className="canvas" width="350" height="350"></canvas>
      </div>
    </>
  );
};

export default CanvasList;
