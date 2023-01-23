import {socket} from "../../modules/sockets.mjs";
import {useState} from "react";
import download_btn from "./../../assets/images/icon-download.png";
import retry_btn from "./../../assets/images/icon-retry.png";
import {finalURL} from "../../modules/resultGIF.mjs";

function PicDownloadBtn() {
    // const [gif, setGIF] = useState(false);

    const onCapture = () => {
        if (finalURL) onSaveImg(finalURL, "PicPiCo_Result.gif");
        else console.log("gif 생성 중");
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
            {/* gif 사진이 보여지는 곳 */}
            <div
                id="testArea"
                style={{ width: 350, height: 350, backgroundColor: "white", boxShadow: "0 0.25rem 1rem rgba(0, 0, 0, 0.2)", marginTop: 80 }}
            ></div>

            {/* 다운로드 버튼과 Home으로 돌아가는 버튼 */}
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "15px"}}>
                <img id="download" src={download_btn} className="btn-shadow" style={{width: "40px", height: "40px", margin: "10px"}} onClick={onCapture} />
                <img
                    id="retry"
                    src={retry_btn}
                    className="btn-shadow"
                    style={{width: "40px", height: "40px", margin: "10px"}}
                    onClick={onGalleryDoneBtnClick}
                />
            </div>
        </>
    );
}
export default PicDownloadBtn;
