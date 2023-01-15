import { useState } from "react";
import { IoCameraReverse } from "react-icons/io5";

const CameraTransBtn = () => {
  const [cameraTrans, setCameraTrans] = useState(false);
  function onCameraTransform() {
    console.log("카메라 전환");
    setCameraTrans(current => !current);
  }
  return (
    <>
      {cameraTrans ? (
        <IoCameraReverse size="40" color="white" onClick={onCameraTransform} />
      ) : (
        <IoCameraReverse size="40" color="white" onClick={onCameraTransform} />
      )}
    </>
  );
};

export default CameraTransBtn;
