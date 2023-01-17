import { Button } from "rsuite";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";

const PicDoneBtn = () => {
  const roomId = useSelector(state => state.roomInfo.room);
  const isKing = useSelector(state => state.membersInfo.king);
  function onPicDoneBtnClick() {
    socket.emit("done_take", roomId, socket.id);
  }

  return (
    <Button className={isKing ? "btn-shadow" : "btn-deactivate"} style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onPicDoneBtnClick}>
      Done 📸
    </Button>
  );
};

export default PicDoneBtn;
