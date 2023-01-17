import { Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { setPicBoothInfo, setSelectionInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";
import { useEffect } from "react";

const PicDoneBtn = () => {
  // const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);

  function onPicDoneBtnClick() {
    // dispatch(setPicBoothInfo({ value: false }));
    // dispatch(setSelectionInfo({ value: true }));
    console.log("done_take emit");
    socket.emit("done_take", roomId, socket.id);
  }
  useEffect(() => {
    return () => {
      console.log("pic done btn bye~");
    };
  });
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onPicDoneBtnClick}>
      Done 📸
    </Button>
  );
};

export default PicDoneBtn;
