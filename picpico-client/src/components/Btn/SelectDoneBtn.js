import { Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { setSelectionInfo, setDecoInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";

const SelectDoneBtn = () => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);

  function onSelectDoneBtnClick() {
    socket.emit("done_pick", roomId);
    dispatch(setSelectionInfo({ value: false }));
    dispatch(setDecoInfo({ value: true }));
  }
  return <Button onClick={onSelectDoneBtnClick}>선택완료</Button>;
};

export default SelectDoneBtn;
