import { Button } from "rsuite";
import html2canvas from "html2canvas";
import camera from "./../../assets/images/camera.png";

function PicDownloadBtn() {
  const onCapture = () => {
    html2canvas(document.getElementById("imageWrapper")).then((canvas) => {
      onSaveImg(canvas.toDataURL("image/jpg"), "PicPiCo_Result.png");
    });
  };
  const onSaveImg = (url, filename) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div id="imageWrapper">
        <img src={camera} width="640" height="640" />
      </div>
      <Button
        block
        size="sm"
        color="violet"
        appearance="primary"
        onClick={onCapture}
      >
        사진 다운로드
      </Button>
    </>
  );
}
export default PicDownloadBtn;
