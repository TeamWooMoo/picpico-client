import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setTakePic, setPicCount } from "../../slice/takepicInfo";
import { socket } from "../../modules/sockets.mjs";

const CanvasList = ({ controller }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const myCanvas = useRef();
  const takePic = useSelector(state => state.takepicInfo.takePic);
  const imgArr = useSelector(state => state.takepicInfo.picImg);

  useEffect(() => {
    if (takePic === true) {
      setCount(prev => prev + 1);
      dispatch(setTakePic({ value: false }));
      dispatch(setPicCount());
      const url = myCanvas.current.toDataURL();
      socket.emit("take_pic", count.toString(), url);
    }
    return () => {
      console.log("canvas list bye~~");
    };
  }, []);
  return <>{/* {imgArr ? <img src={imgArr[imgArr.length - 1]} alt="plz"></img> : null} */}</>;
};

export default CanvasList;
