import { socket } from "../../modules/sockets.mjs";
import narin from "../../assets/gif/narin.gif";
import { gifTest } from "../../test/resultTest.mjs";
import ImageList from "@mui/material/ImageList";
import download_btn from "./../../assets/images/icon-download.png";
import retry_btn from "./../../assets/images/icon-retry.png";

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

    function onGalleryDoneBtnClick() {
        socket.emit("next_step", "gallery", socket.id);
        window.location.href = "/";
    }

    return (
        <>
            <div id="imageWrapper" style={{ margin: "15px", boxShadow: "rgba(26, 18, 18, 0.25) 0 1px 2px 0" }}>
                <ImageList sx={{ width: 365, height: 450 }} cols={1} rowHeight={350}>
                    <div id="testArea"></div>
                </ImageList>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={download_btn} className="btn-shadow" style={{ width: "40px", height: "40px", justifyContent: "center" }} onClick={onCapture} />
                <img
                    src={retry_btn}
                    className="btn-shadow"
                    style={{ width: "40px", height: "40px", justifyContent: "center" }}
                    onClick={onGalleryDoneBtnClick}
                />
            </div>
        </>
    );
}
export default PicDownloadBtn;
