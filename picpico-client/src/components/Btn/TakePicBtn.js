import { useDispatch } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { setTakePic } from "../../slice/takepicInfo";

function TakePicBtn() {
  const dispatch = useDispatch();

  const onTakePicBtnClick = () => {
    console.log("사진 찍히니 ~");
    dispatch(setTakePic({ value: true }));
  };

  return (
    <>
      <IoRadioButtonOnOutline className="btn" color="red" size="40" padding="5px 0" onClick={onTakePicBtnClick}></IoRadioButtonOnOutline>
    </>
  );
}
export default TakePicBtn;
