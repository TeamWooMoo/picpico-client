import { Button } from "rsuite";
import html2canvas from "html2canvas";

function PicDownloadBtn() {
  const onCapture = () => {
    html2canvas(document.getElementById("imageWrapper")).then(canvas => {
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
        <img />
        {/* <img src={camera} width="640" height="640" /> */}
      </div>
      <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onCapture}>
        Download Picture 📥
      </Button>
    </>
  );
}
export default PicDownloadBtn;
