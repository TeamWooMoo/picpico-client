import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setDecoInfo, setGalleryInfo } from "../../slice/picpicoInfo";

const DecoDoneBtn = () => {
  const dispatch = useDispatch();
  function onDecoDoneBtnClick() {
    dispatch(setDecoInfo({ value: false }));
    dispatch(setGalleryInfo({ value: true }));
  }
  return <Button onClick={onDecoDoneBtnClick}>Deco 완료</Button>;
};

export default DecoDoneBtn;
