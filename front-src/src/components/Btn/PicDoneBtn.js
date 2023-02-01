import { Button } from "rsuite";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import next_btn from "./../../assets/images/icon-next.png";

const PicDoneBtn = () => {
  const roomId = useSelector(state => state.roomInfo.room);
  const isKing = useSelector(state => state.membersInfo.king);

  function onPicDoneBtnClick() {
    console.log("i want to quit picBooth");
    socket.emit("done_take", roomId, socket.id);
  }

  return <img src={next_btn} className={isKing ? "btn-shadow" : "btn-deactivate"} style={{ width: "40px", height: "40px" }} onClick={onPicDoneBtnClick} />;
};

export default PicDoneBtn;
