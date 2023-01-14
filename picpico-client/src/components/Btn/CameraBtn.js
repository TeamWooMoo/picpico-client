import { Button } from "rsuite";
import { useState } from "react";

function CameraBtn() {
  const [camera, setCamera] = useState(true);
  const onCameraOnOff = () => {
    console.log("camera on off");
    setCamera((current) => !current);
  };
  return (
    <>
      <Button
        block
        size="sm"
        color="violet"
        appearance="primary"
        className="violet_btn"
        onClick={onCameraOnOff}
      >
        {camera ? "Camera On" : "Camera Off"}
      </Button>
    </>
  );
}
export default CameraBtn;
