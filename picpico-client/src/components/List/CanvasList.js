import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTakePic } from "../../slice/takepicInfo";
import { socket } from "../../modules/sockets.mjs";
import "./CanvasList.css";
var PNG = require("png-js");

const CanvasList = () => {
  const dispatch = useDispatch();
  const imgIdx = useSelector(state => state.takepicInfo.imgIdx);
  const shuttered = useSelector(state => state.takepicInfo.takePic);

  useEffect(() => {
    if (shuttered === true) {
      // const bgCanvas = document.getElementById("bgCanvas");
      // const bgCtx = bgCanvas.getContext("2d");
      // bgCtx.fillStyle = "red";
      // bgCtx.fillRect(0, 0, 350, 350);
      const filmCanvas = document.getElementById("filmCanvas"); // canvas
      const allCanvases = document.getElementById("allCanvases"); // div
      const ctx = filmCanvas.getContext("2d");
      // ctx.drawImage(bgCanvas, 0, 0);

      const videoRow = document.getElementById("peerVideos");

      for (const child of allCanvases.children) {
        const gl = child.getContext("webgl");

        var pixels = new Uint8Array(child.width * child.height * 4);
        gl.readPixels(0, 0, child.width, child.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        var png = new PNG({
          width: child.width,
          height: child.height,
          filterType: -1,
        });

        png.data = pixels;
        var pngData = Image.sync.write(png);

        filmCanvas.putImageData(pngData, 0, 0);
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
