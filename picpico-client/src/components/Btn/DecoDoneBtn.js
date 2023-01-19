import { Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { setDoneDecoInfo } from "../../slice/decoInfo.js";

const DecoDoneBtn = () => {
  const dispatch = useDispatch();
  const isKing = useSelector(state => state.membersInfo.king);
  const roomId = useSelector(state => state.roomInfo.room);

  function onDecoDoneBtnClick() {
    socket.emit("done_deco", roomId, socket.id);
    dispatch(setDoneDecoInfo({ value: true }));
  }
  return (
    <Button className={isKing ? "btn-shadow" : "btn-deactivate"} style={{ lineHeight: "15px", margin: "0px 0px 10px" }} onClick={onDecoDoneBtnClick}>
      Deco complete ✍️
    </Button>
  );
};

export default DecoDoneBtn;
