import { useDispatch, useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";

import sticker1 from "../../assets/gif/sticker1.gif";
import sticker2 from "../../assets/gif/sticker2.gif";
import sticker3 from "../../assets/gif/sticker3.gif";
import coding from "../../assets/gif/coding.gif";
import happy from "../../assets/gif/happy.gif";
import heart from "../../assets/gif/heart.gif";
import { polyfill } from "mobile-drag-drop";

import { socket } from "../../modules/sockets.mjs";
import { setDecoModeInfo } from "../../slice/decoInfo";
import { v1 as uuid } from "uuid";

const StickerList = () => {
    polyfill();
    const dispatch = useDispatch();
    const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
    const onStickerClick = url => {
        console.log("스티커 클릭 url=", url);
        const newStickerId = uuid();
        console.log("newStickerId>>", newStickerId);
        socket.emit("pick_sticker", url, targetImgIdx, newStickerId);
        dispatch(setDecoModeInfo({ value: "sticker" }));
    };

    return (
        <>
            <FlexboxGrid justify="center" className="color-options">
                <div style={{ height: "40px" }}></div>
                <div id="">
                    <img style={{ height: "40px" }} onClick={() => onStickerClick(sticker1)} src={sticker1} draggable="true" />
                    <img style={{ height: "40px" }} onClick={() => onStickerClick(happy)} src={happy} draggable="true" />
                    <img style={{ height: "40px" }} onClick={() => onStickerClick(sticker2)} src={sticker2} draggable="true" />
                    <img style={{ height: "40px" }} onClick={() => onStickerClick(coding)} src={coding} draggable="true" />
                    <img style={{ height: "40px" }} onClick={() => onStickerClick(sticker3)} src={sticker3} draggable="true" />
                    <img style={{ height: "40px" }} onClick={() => onStickerClick(heart)} src={heart} draggable="true" />
                </div>
            </FlexboxGrid>
        </>
    );
};

export default StickerList;
