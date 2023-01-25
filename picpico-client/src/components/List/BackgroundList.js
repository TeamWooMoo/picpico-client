import { FlexboxGrid } from "rsuite";
import star from "./../../assets/images/background-star.png";
import water from "./../../assets/images/background-water.png";
import none from "./../../assets/images/background-none.png";
import { socket } from "../../modules/sockets.mjs";
import { useState } from "react";

const StickerList = () => {
    const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
    const onBgClick = event => {
        const bg = event.target;
        const bgIdx = bg.dataset.bg;
        console.log();
        console.log("emit pick bg:", bgIdx, targetImgIdx);
        socket.emit("pick_bg", bgIdx, targetImgIdx);
    };


const StickerList = () => {
    return (
        <>
            <FlexboxGrid justify="center" className="color-options">
                <div style={{ height: "40px" }}></div>
                <div id="">
                    <img style={{ height: "40px", margin: "0 5px" }} src={none} onClick={onBgClick} data-bg="0" alt="bg-0" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={star} onClick={onBgClick} data-bg="1" alt="bg-1" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={water} onClick={onBgClick} data-bg="2" alt="bg-2" />
                </div>
            </FlexboxGrid>
        </>
    );
};

export default StickerList;
