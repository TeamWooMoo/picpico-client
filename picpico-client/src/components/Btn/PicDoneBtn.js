import { Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { setPicBoothInfo, setSelectionInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";
import { useEffect } from "react";

const PicDoneBtn = ({ controller }) => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);

  function onPicDoneBtnClick() {
    dispatch(setPicBoothInfo({ value: false }));
    dispatch(setSelectionInfo({ value: true }));
    console.log("나 다 찍었어");
    // controller.doneTake(roomId);
    socket.emit("done_take", roomId);
  }
  useEffect(() => {
    return () => {
      console.log("pic done btn bye~");
    };
  });
  return (
    <Button block size="sm" color="violet" appearance="primary" className="violet_btn" onClick={onPicDoneBtnClick}>
      사진찍기 완료
    </Button>
  );
};

export default PicDoneBtn;
