import "./SelectList.css";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useRef } from "react";
import { setSelectedInfo } from "../../slice/selectionInfo.js";

const SelectList = () => {
    const dispatch = useDispatch();
    const roomId = useSelector(state => state.roomInfo.room);
    const selected = useSelector(state => state.selectionInfo.selected); //숫자 스트링 그 자체
    const imgData = useSelector(state => state.selectionInfo.imgList);
    console.log("imgData: ", imgData);

    // const refs = useRef([]);

    //imgArr가 보여야 함.
    const onImageClick = event => {
        const pic = event.target;
        const picId = pic.dataset.pid;

        socket.emit("pick_pic", roomId, picId);
    };
    // imgArr의 id == selected인걸 봐서 activate <=> deactivate 토글처럼
    useEffect(() => {
        if (selected !== "") {
            const imgTag = document.getElementById(`pic-${selected}`);
            // const imgTag = refs.current[selected];

            imgTag.classList.toggle("activate_pic");

            if (imgTag.classList.contains("activate_pic")) {
                imgTag.style.border = "4px solid #2c3e50";
            } else {
                imgTag.style.border = "";
            }

            console.log("imgTag:", imgTag);

            dispatch(setSelectedInfo({ value: "" }));
        }
    }, [selected]);
    return (
        <>
            <ImageList sx={{ justifyContent: "center", width: 350, height: 500, borderRadius: "7px" }} cols={1} rowHeight={350}>
                {Object.entries(imgData).map(([idx, url]) => (
                    <ImageListItem>
                        <img alt={`pic-${idx}`} onClick={onImageClick} src={url} data-pid={idx} id={`pic-${idx}`} style={{ backgroundColor: "white" }} />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};
export default SelectList;
