import { FlexboxGrid } from "rsuite";
import none from "./../../assets/images/background-none.png";
import snow from "./../../assets/images/background-snow.png";
import boom from "./../../assets/images/background-boom.png";
import party from "./../../assets/images/background-party.png";
import water from "./../../assets/images/background-water.png";
import matrix from "./../../assets/images/background-matrix.png";
import { socket } from "../../modules/sockets.mjs";
import { useSelector } from "react-redux";

const StickerList = () => {
    const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
    const onBgClick = event => {
        const bg = event.target;
        const bgIdx = bg.dataset.bg;
        console.log();
        console.log("emit pick bg:", bgIdx, targetImgIdx);
        socket.emit("pick_bg", bgIdx, targetImgIdx);
    };

    return (
        <>
            <FlexboxGrid justify="center" className="color-options">
                <div style={{ height: "40px" }}></div>
                <div id="">
                    <img style={{ height: "40px", margin: "0 5px" }} src={none} onClick={onBgClick} data-bg="0" alt="bg-0" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={snow} onClick={onBgClick} data-bg="1" alt="bg-1" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={party} onClick={onBgClick} data-bg="2" alt="bg-2" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={boom} onClick={onBgClick} data-bg="3" alt="bg-3" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={water} onClick={onBgClick} data-bg="4" alt="bg-4" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={matrix} onClick={onBgClick} data-bg="5" alt="bg-5" />
                </div>
            </FlexboxGrid>
        </>
    );
};

export default StickerList;
