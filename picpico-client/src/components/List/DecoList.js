import { ImageList, ImageListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import "./DecoList.css";
import { useEffect, useState } from "react";
import { setDecoModeInfo, setMyDecoCanvasInfo } from "../../slice/decoInfo.js";

const DecoList = () => {
    const dispatch = useDispatch();
    const decoData = useSelector(state => state.decoInfo.decoList);
    const idxArr = Object.keys(decoData);
    const [prevIdx, setPrevIdx] = useState(idxArr[0]);

    const decoColors = useSelector(state => state.decoInfo.colorList);
    const decoMapping = {};
    for (let i = 0; i < 4; i++) {
        decoMapping[idxArr[i]] = decoColors[i];
    }
    const onDecoImgClick = event => {
        const deco = event.target;
        const decoIdx = deco.dataset.deco;
        socket.emit("pick_deco", socket.id, decoIdx, prevIdx);
        dispatch(setDecoModeInfo({ value: "stroke" }));
        dispatch(setMyDecoCanvasInfo({ value: decoIdx }));
        setPrevIdx(decoIdx);
    };

    return (
        <>
            <ImageList sx={{ width: 350, height: 90, margin: "10px" }} cols={4} rowHeight={90}>
                {idxArr.map(idx => (
                    <ImageListItem style={{ flex: 1, flexDirection: "row", height: 90 }}>
                        <img
                            alt={`deco-${idx}`}
                            onClick={onDecoImgClick}
                            src={decoData[idx]["picture"]}
                            data-deco={idx}
                            id={`deco-${idx}`}
                            style={{ border: `2px solid ${decoMapping[idx]}` }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};

export default DecoList;
