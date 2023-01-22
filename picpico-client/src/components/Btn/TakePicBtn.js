import { useDispatch, useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { IoMdRadioButtonOn } from "react-icons/io";
import { socket } from "../../modules/sockets.mjs";
import "./TakePicBtn.css";
// import { onClickShutterEvent } from "./../../modules/clickshutter.mjs";

function TakePicBtn() {
    const idx = useSelector(state => state.takepicInfo.idx);

    const onTakePicBtnClick = () => {
        console.log("사진 찍히니 ~");
        const shutterSound = new Audio("shutter.mp3");
        shutterSound.play().catch(e => {
            console.log(e);
        });
        // onClickShutterEvent(idx);
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
