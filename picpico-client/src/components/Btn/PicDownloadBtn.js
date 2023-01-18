import { Button } from "rsuite";
import html2canvas from "html2canvas";
import camera from "./../../assets/images/camera.png";
import narin from "../../assets/gif/narin.gif";

function PicDownloadBtn() {
  const onCapture = () => {
    // html2canvas(document.getElementById("imageWrapper")).then(canvas => {
    //   onSaveImg(canvas.toDataURL("image/jpg"), "PicPiCo_Result.png");
    // });
    onSaveImg(narin, "PicPiCo_Result.gif");
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
      <div id="imageWrapper" style={{ margin: "15px", boxShadow: "rgba(26, 18, 18, 0.25) 0 1px 2px 0" }}>
        <img width="350px" height="350px" src={narin} />
      </div>
      <Button className="btn-shadow" style={{ lineHeight: "15px" }} onClick={onCapture}>
        Download Picture 📥
      </Button>
    </>
  );
}
export default PicDownloadBtn;
