import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setSelectionInfo, setDecoInfo } from "../../slice/picpicoInfo";

const SelectDoneBtn = () => {
  const dispatch = useDispatch();

  function onSelectDoneBtnClick() {
    dispatch(setSelectionInfo({ value: false }));
    dispatch(setDecoInfo({ value: true }));
  }
  return <Button onClick={onSelectDoneBtnClick}>선택완료</Button>;
};

export default SelectDoneBtn;
