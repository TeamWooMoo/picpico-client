import { useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { socket } from "../../modules/sockets.mjs";
function TakePicBtn() {
  const idx = useSelector(state => state.takepicInfo.idx);

  const onTakePicBtnClick = () => {
    console.log("사진 찍히니 ~");
    socket.emit("click_shutter", idx);
  };

  return (
    <>
      <IoRadioButtonOnOutline
        id="takePicBtn"
        className="btn-shadow"
        color="red"
        size="40px"
        padding="5px 0"
        onClick={onTakePicBtnClick}
      ></IoRadioButtonOnOutline>
    </>
  );
}
export default TakePicBtn;
