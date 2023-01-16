import { useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { IoVideocamOff } from "react-icons/io5";

function CameraBtn() {
  const [camera, setCamera] = useState(true);
  const onCameraOnOff = () => {
    console.log("camera on off");
    setCamera(current => !current);
  };
  return (
    <>
      {camera ? (
        <IoVideocam size="40" color="black" padding="10px 0" onClick={onCameraOnOff}></IoVideocam>
      ) : (
        <IoVideocamOff size="40" color="black" padding="10px 0" onClick={onCameraOnOff}></IoVideocamOff>
      )}
    </>
  );
}
export default CameraBtn;
