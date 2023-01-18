import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setTakePic } from "../../slice/takepicInfo";
import { socket } from "../../modules/sockets.mjs";
import "./CanvasList.css";

const CanvasList = () => {
  const dispatch = useDispatch();
  const allCanvases = useRef();
  const filmCanvas = useRef();

  const shuttered = useSelector(state => state.takepicInfo.takePic);
  const idx = useSelector(state => state.takepicInfo.idx);

  useEffect(() => {
    if (shuttered === true) {
      console.log("방장이 셔터 눌렀다. 이제 다같이 찍습니다.");
      const myCanvas = allCanvases.current.children[0];
      const filmCtx = filmCanvas.current.getContext("2d");
      filmCtx.drawImage(myCanvas, 0, 0);
      const url = filmCanvas.current.toDataURL("image/png"); // 내 얼굴만 있는 이미지 url

      socket.emit("send_pic", (parseInt(idx) - 1).toString(), url);
      console.log("내 사진만 한장 보낼게!");

      dispatch(setTakePic({ value: false }));

      filmCtx.clearRect(0, 0, 350, 350);
    }
  }, [shuttered]);

  return (
    <>
      <div className="canvasBox">
        <canvas id="myGreenCanvas" className="canvas"></canvas>
        <div id="allCanvases" ref={allCanvases}></div>
        <canvas id="filmCanvas" className="canvas" width="350" height="350" ref={filmCanvas}></canvas>
      </div>
    </>
  );
};

export default CanvasList;
