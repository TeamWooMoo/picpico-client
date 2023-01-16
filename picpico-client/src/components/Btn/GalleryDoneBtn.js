import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setPicBoothInfo, setGalleryInfo } from "../../slice/picpicoInfo";

const GalleryDoneBtn = () => {
  const dispatch = useDispatch();

  function onGalleryDoneBtnClick() {
    dispatch(setGalleryInfo({ value: false }));
    dispatch(setPicBoothInfo({ value: true }));

    window.location.href = "/";
  }
  return (
    <Button className="btn-shadow" style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onGalleryDoneBtnClick}>
      Finish PicPiCo
    </Button>
  );
};

export default GalleryDoneBtn;
