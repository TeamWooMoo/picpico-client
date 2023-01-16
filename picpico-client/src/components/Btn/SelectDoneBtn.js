import { Button, Footer } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { setSelectionInfo, setDecoInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";

const SelectDoneBtn = ({ controller }) => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);

  function onSelectDoneBtnClick() {
    socket.emit("done_pick", roomId);
    dispatch(setSelectionInfo({ value: false }));
    dispatch(setDecoInfo({ value: true }));
  }
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onSelectDoneBtnClick}>
      Selection complete 👌
    </Button>
  );
};

export default SelectDoneBtn;
