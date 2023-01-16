import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setDecoInfo, setGalleryInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";

const DecoDoneBtn = () => {
  const dispatch = useDispatch();
  function onDecoDoneBtnClick() {
    socket.emit("next_step", "decoration", socket.id);
    // dispatch(setDecoInfo({ value: false }));
    // dispatch(setGalleryInfo({ value: true }));
  }
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onDecoDoneBtnClick}>
      Deco 완료
    </Button>
  );
};

export default DecoDoneBtn;
