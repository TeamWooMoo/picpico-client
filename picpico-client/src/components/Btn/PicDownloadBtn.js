import { Button } from "rsuite";
import camera from "./../../assets/images/camera.png";
import narin from "../../assets/gif/narin.gif";
import { gifTest } from "../../test/resultTest.mjs";
import ImageList from "@mui/material/ImageList";
import download_btn from "./../../assets/images/icon-download.png";

function PicDownloadBtn() {
  const onCapture = () => {
    // html2canvas(document.getElementById("imageWrapper")).then(canvas => {
    // onSaveImg(canvas.toDataURL("image/jpg"), "PicPiCo_Result.png");
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
        <ImageList sx={{ width: 365, height: 450 }} cols={1} rowHeight={350}>
          <div id="testArea"></div>
        </ImageList>
      </div>
      <img src={download_btn} className="btn-shadow" style={{ width: "40px", height: "40px" }} onClick={onCapture} />
    </>
  );
}
export default PicDownloadBtn;
