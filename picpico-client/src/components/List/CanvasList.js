import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setPicImg } from "../../slice/takepicInfo";

const CanvasList = () => {
  const dispatch = useDispatch();
  const myCanvas = useRef();
  const takePic = useSelector(state => state.takepicInfo.takePic);
  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  if (takePic === true) {
    const url = myCanvas.current.toDataURL();

    const img = dataURLtoFile(url, "1");
    dispatch(setPicImg({ value: img }));
  }

  return (
    <div className="canvasBox">
      <canvas id="myCanvas" className="canvas" ref={myCanvas}></canvas>
      <canvas id="peerCanvas" className="canvas"></canvas>
    </div>
  );
};

export default CanvasList;
