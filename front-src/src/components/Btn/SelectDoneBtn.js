import { Button, Footer } from "rsuite";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import next_btn from "./../../assets/images/icon-next.png";

const SelectDoneBtn = ({ controller }) => {
  const roomId = useSelector(state => state.roomInfo.room);
  const isKing = useSelector(state => state.membersInfo.king);

  function onSelectDoneBtnClick() {
    socket.emit("done_pick", roomId, socket.id);
  }
  return <img src={next_btn} className={isKing ? "btn-shadow" : "btn-deactivate"} style={{ width: "40px", height: "40px" }} onClick={onSelectDoneBtnClick} />;
};

export default SelectDoneBtn;
