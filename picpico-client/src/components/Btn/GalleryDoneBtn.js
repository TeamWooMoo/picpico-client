import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setPicBoothInfo, setGalleryInfo } from "../../slice/picpicoInfo";
import { Link } from "react-router-dom";

const GalleryDoneBtn = () => {
  const dispatch = useDispatch();

  function onGalleryDoneBtnClick() {
    dispatch(setGalleryInfo({ value: false }));
    dispatch(setPicBoothInfo({ value: true }));
  }
  return (
    <Link to={"/"}>
      <Button onClick={onGalleryDoneBtnClick}>완료다 진짜로</Button>
    </Link>
  );
};

export default GalleryDoneBtn;
