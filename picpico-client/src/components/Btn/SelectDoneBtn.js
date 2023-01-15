import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setSelectionInfo, setDecoInfo } from "../../slice/picpicoInfo";

const SelectDoneBtn = ({ controller }) => {
  const dispatch = useDispatch();

  function onSelectDoneBtnClick() {
    controller.donePick();
    dispatch(setSelectionInfo({ value: false }));
    dispatch(setDecoInfo({ value: true }));
  }
  return <Button onClick={onSelectDoneBtnClick}>선택완료</Button>;
};

export default SelectDoneBtn;
