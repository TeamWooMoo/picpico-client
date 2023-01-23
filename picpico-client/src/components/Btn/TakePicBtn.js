import { useDispatch, useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { IoMdRadioButtonOn } from "react-icons/io";
import { socket } from "../../modules/sockets.mjs";
import "./TakePicBtn.css";

function TakePicBtn() {
    const idx = useSelector(state => state.takepicInfo.idx);

    const onTakePicBtnClick = () => {
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
