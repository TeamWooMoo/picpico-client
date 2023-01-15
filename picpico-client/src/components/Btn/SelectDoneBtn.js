import { Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { setSelectionInfo, setDecoInfo } from "../../slice/picpicoInfo";

const SelectDoneBtn = ({ controller }) => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);

  function onSelectDoneBtnClick() {
    controller.donePick(roomId);
    dispatch(setSelectionInfo({ value: false }));
    dispatch(setDecoInfo({ value: true }));
  }
  return <Button onClick={onSelectDoneBtnClick}>선택완료</Button>;
};

export default SelectDoneBtn;
