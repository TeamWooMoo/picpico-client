import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setPicBoothInfo, setGalleryInfo } from "../../slice/picpicoInfo";
import { Link } from "react-router-dom";

const GalleryDoneBtn = () => {
  const dispatch = useDispatch();

  function onGalleryDoneBtnClick() {
    dispatch(setGalleryInfo({ value: false }));
    dispatch(setPicBoothInfo({ value: true }));

    window.location.href = "/";
  }
<<<<<<< HEAD
  return (
    <Link to={"/"}>
      {/* 메인 화면으로 넘어가는 버튼 */}
      <Button onClick={onGalleryDoneBtnClick}>픽피코 완료 </Button>
    </Link>
  );
=======
  return <Button onClick={onGalleryDoneBtnClick}>완료다 진짜로</Button>;
>>>>>>> a6d905e51e5389c595c88bf051ecc7d5305f6e7b
};

export default GalleryDoneBtn;
