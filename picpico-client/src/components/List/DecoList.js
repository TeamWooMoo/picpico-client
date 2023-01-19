import { ImageList, ImageListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import "./DecoList.css";
import { useState } from "react";
import { setMyDecoCanvasInfo } from "../../slice/decoInfo.js";

const DecoList = () => {
  const [prevIdx, setPrevIdx] = useState(1);
  const dispatch = useDispatch();
  const decoData = useSelector(state => state.decoInfo.decoList);
  const idxArr = Object.keys(decoData);

  const decoColors = useSelector(state => state.decoInfo.colorList);
  const decoMapping = {};
  for (let i = 0; i < 4; i++) {
    decoMapping[idxArr[i]] = decoColors[i];
  }
  // /*
  //   사진 인덱스  {
  //     viewers: [{nickName: 닉네임, socketId: 닉네임}]
  //     picture:
  //   }
  // */
  const onDecoImgClick = event => {
    const deco = event.target;
    const decoIdx = deco.dataset.deco;
    socket.emit("pick_deco", socket.id, decoIdx, prevIdx);
    dispatch(setMyDecoCanvasInfo({ value: decoIdx }));
    setPrevIdx(decoIdx);
  };
  return (
    <>
      <ImageList sx={{ width: 350 }} cols={4} rowHeight={10}>
        {idxArr.map(idx => (
          <ImageListItem style={{ flex: 1, flexDirection: "row", height: "0" }}>
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
