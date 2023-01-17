import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect } from "react";

const SelectList = () => {
  const roomId = useSelector(state => state.roomInfo.room);
  const selected = useSelector(state => state.selectionInfo.selected); //숫자 스트링 그 자체
  const imgData = useSelector(state => state.selectionInfo.ImageList);
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
      imgTag.classList.toggle("activate_pic");
    }
  }, [selected]);
  return (
    <>
      {/* <ImageList sx={{ width: 350, height: 350 }} cols={1} rowHeight={350}>
        {imgData.map(img => (
          <ImageListItem>
            <img alt={`pic-${img.idx}`} onClick={onImageClick} src={img.src} data-pid={img.idx} id={`pic-${img.idx}`} />
          </ImageListItem>
        ))}
      </ImageList> */}
    </>
  );
};
export default SelectList;
