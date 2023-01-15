import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setTakePic, setPicCount } from "../../slice/takepicInfo";
const CanvasList = ({ controller }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const myCanvas = useRef();
  const takePic = useSelector(state => state.takepicInfo.takePic);
  const imgArr = useSelector(state => state.takepicInfo.picImg);

  if (takePic === true) {
    setCount(prev => prev + 1);
    dispatch(setTakePic({ value: false }));
    dispatch(setPicCount());
    const url = myCanvas.current.toDataURL();
    controller.takePic(count.toString(), url);
  }
  useEffect(() => {
    const ctx = myCanvas.current.getContext("2d");
    /* 아래는 예시입니다. */
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src =
      "https://cdn.crowdpic.net/list-thumb/thumb_l_FD8184F80AF8D28615C95B97C1AE4D63.jpeg";
    img.crossOrigin = "Anonymous";
  });
  return (
    <>
      <div className="canvasBox">
        <canvas
          id="myCanvas"
          className="canvas"
          ref={myCanvas}
          width="100"
          height="100"
        ></canvas>
        <canvas id="peerCanvas" className="canvas"></canvas>
      </div>
      {imgArr ? <img src={imgArr[imgArr.length - 1]} alt="plz"></img> : null}
    </>
  );
};

export default CanvasList;
