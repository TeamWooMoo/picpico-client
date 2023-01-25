import { useDispatch, useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";
import star from "./../../assets/images/background-star.png";
import water from "./../../assets/images/background-water.png";
import { socket } from "../../modules/sockets.mjs";
import { v1 as uuid } from "uuid";

const StickerList = () => {
    const dispatch = useDispatch();
    const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
    const onStickerClick = url => {
        console.log("background");
        // const newStickerId = uuid();
        // console.log("newStickerId>>", newStickerId);
        // socket.emit("pick_sticker", url, targetImgIdx, newStickerId);
        // dispatch(setDecoModeInfo({ value: "sticker" }));
    };

    return (
        <>
            <FlexboxGrid justify="center" className="color-options">
                <div style={{ height: "40px" }}></div>
                <div id="">
                    <img style={{ height: "40px", margin: "0 5px" }} src={star} draggable="true" />
                    <img style={{ height: "40px", margin: "0 5px" }} src={water} draggable="true" />
                </div>
            </FlexboxGrid>
        </>
    );
};

export default StickerList;
