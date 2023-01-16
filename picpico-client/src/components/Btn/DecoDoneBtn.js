import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setDecoInfo, setGalleryInfo } from "../../slice/picpicoInfo";

const DecoDoneBtn = () => {
  const dispatch = useDispatch();
  function onDecoDoneBtnClick() {
    dispatch(setDecoInfo({ value: false }));
    dispatch(setGalleryInfo({ value: true }));
  }
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onDecoDoneBtnClick}>
      Deco complete ✍️
    </Button>
  );
};

export default DecoDoneBtn;
