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
            <ImageList sx={{ justifyContent: "center", width: 350, height: 500, borderRadius: "7px" }} cols={1} rowHeight={350}>
                <div id="testArea"></div>
            </ImageList>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <img id="download" src={download_btn} className="btn-shadow" style={{ width: "40px", height: "40px", margin: "0 10px" }} onClick={onCapture} />
                <img
                    id="retry"
                    src={retry_btn}
                    className="btn-shadow"
                    style={{ width: "40px", height: "40px", margin: "0 10px" }}
                    onClick={onGalleryDoneBtnClick}
                />
            </div>
        </>
    );
}
export default PicDownloadBtn;
