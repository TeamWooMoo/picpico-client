import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setImgIdxCount, setTakePic } from "../../slice/takepicInfo";
import { socket } from "../../modules/sockets.mjs";
import "./CanvasList.css";

const CanvasList = () => {
  const dispatch = useDispatch();
  const myCanvas = useRef();
  const imgIdx = useSelector(state => state.takepicInfo.imgIdx);
  const shutterd = useSelector(state => state.takepicInfo.takePic);

  useEffect(() => {
    if (shutterd === true) {
      // console.log(shutterd);
      // console.log("shutterd 확인 !!");
      dispatch(setImgIdxCount({ value: imgIdx + 1 }));
      const url = myCanvas.current.toDataURL();
      socket.emit("take_pic", imgIdx.toString(), url);
      dispatch(setTakePic({ value: false }));
    }
  }, [shutterd]);
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
