import { useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { socket } from "../../modules/sockets.mjs";
import shutterSound from "./../../assets/sound/shutter.mp3";

function TakePicBtn() {
    const idx = useSelector(state => state.takepicInfo.idx);

    const shuttersound = new Audio(shutterSound);

    const onTakePicBtnTouch = e => {
        e.preventDefault();
    };
    const onTakePicBtnClick = e => {
        shuttersound.play().catch(e => {
            console.log(e);
        });

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
                style={{ position: "fixed", left: "50%", transform: "translateX( -50% )" }}
                onClick={onTakePicBtnClick}
                onTouchEnd={onTakePicBtnTouch}
            ></IoRadioButtonOnOutline>
        </>
    );
}
export default TakePicBtn;
