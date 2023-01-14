import { Button } from "rsuite";
import { useRef } from "react";

function PicDownloadBtn() {
  const canvas = useRef();

  const onSaveImg = () => {
    console.log("사진 저장합니다 ~~");
    const imageURL = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.download = "paint_image";
    link.href = imageURL;
    link.click();
  };
  return (
    <>
      <canvas ref={canvas}></canvas>
      <Button
        block
        size="sm"
        color="violet"
        appearance="primary"
        onClick={onSaveImg}
      >
        사진 다운로드
      </Button>
    </>
  );
}
export default PicDownloadBtn;
