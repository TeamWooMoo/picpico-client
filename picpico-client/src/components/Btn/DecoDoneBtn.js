import { Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { setDecoInfo, setGalleryInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";

const DecoDoneBtn = () => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);

  function onDecoDoneBtnClick() {
    socket.emit("done_deco", roomId, socket.id);
    // dispatch(setDecoInfo({ value: false }));
    // dispatch(setGalleryInfo({ value: true }));
  }
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onDecoDoneBtnClick}>
      Deco 완료
    </Button>
  );
};

export default DecoDoneBtn;
