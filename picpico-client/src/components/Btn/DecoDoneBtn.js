import { Button } from "rsuite";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";

const DecoDoneBtn = () => {
  const isKing = useSelector(state => state.membersInfo.king);
  const roomId = useSelector(state => state.roomInfo.room);

  function onDecoDoneBtnClick() {
    socket.emit("done_deco", roomId, socket.id);
  }
  return (
    <Button className={isKing ? "btn-shadow" : "btn-deactivate"} style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onDecoDoneBtnClick}>
      Deco 완료
    </Button>
  );
};

export default DecoDoneBtn;
