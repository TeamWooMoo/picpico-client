import { useState } from "react";
import { IoCameraReverseSharp } from "react-icons/io5";

const CameraTransBtn = () => {
  const [cameraTrans, setCameraTrans] = useState(false);
  function onCameraTransform() {
    console.log("카메라 전환");
    setCameraTrans(current => !current);
  }
  return (
    <>
      {cameraTrans ? (
        <IoCameraReverseSharp color="white" size="40" padding="5px 0" onClick={onCameraTransform}></IoCameraReverseSharp>
      ) : (
        <IoCameraReverseSharp color="white" size="40" padding="5px 0" onClick={onCameraTransform}></IoCameraReverseSharp>
      )}
    </>
  );
};

export default CameraTransBtn;
