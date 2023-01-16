import { Button, Footer } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { setSelectionInfo, setDecoInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";

const SelectDoneBtn = ({ controller }) => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);

  function onSelectDoneBtnClick() {
    socket.emit("done_pick", roomId);
    socket.emit("next_step", "selection", socket.id);
    // dispatch(setSelectionInfo({ value: false }));
    // dispatch(setDecoInfo({ value: true }));
  }
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onSelectDoneBtnClick}>
      선택 완료 👌
    </Button>
  );
};

export default SelectDoneBtn;
