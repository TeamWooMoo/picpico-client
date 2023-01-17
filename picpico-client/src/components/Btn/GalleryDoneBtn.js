import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setPicBoothInfo, setGalleryInfo } from "../../slice/picpicoInfo";
import { socket } from "../../modules/sockets.mjs";

const GalleryDoneBtn = () => {
  const dispatch = useDispatch();

  function onGalleryDoneBtnClick() {
    socket.emit("next_step", "gallery", socket.id);
    // dispatch(setGalleryInfo({ value: false }));
    // dispatch(setPicBoothInfo({ value: true }));

    window.location.href = "/";
  }
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onGalleryDoneBtnClick}>
      Finish PicPiCo
    </Button>
  );
};

export default GalleryDoneBtn;
