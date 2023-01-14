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
      {/* 메인 화면으로 넘어가는 버튼 */}
      <Button onClick={onGalleryDoneBtnClick}>픽피코 완료 </Button>
    </Link>
  );
};

export default GalleryDoneBtn;
