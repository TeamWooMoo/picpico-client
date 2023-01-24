import { useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { socket } from "../../modules/sockets.mjs";
import shutterSound from "./../../assets/sound/shutter.mp3";

function TakePicBtn() {
    const idx = useSelector(state => state.takepicInfo.idx);

    const shuttersound = new Audio(shutterSound);
    const onTakePicBtnClick = () => {
        console.log("사진 찍히니 ~");
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
                onClick={onTakePicBtnClick}
            ></IoRadioButtonOnOutline>
        </>
    );
}
export default TakePicBtn;
