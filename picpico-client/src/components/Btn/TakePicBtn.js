import { useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { socket } from "../../modules/sockets.mjs";
import shutterSound from "./../../assets/sound/shutter.mp3";
import { isMobile } from "react-device-detect";

function TakePicBtn() {
    const idx = useSelector(state => state.takepicInfo.idx);

    const shuttersound = new Audio(shutterSound);

    const onTakePicBtnTouch = e => {
        switch (e.type) {
            case "touchstart":
                break;
            case "touchend":
                shuttersound.play().catch(e => {
                    console.log(e);
                });
                break;
            case "mouseup":
                e.preventDefault();
                break;
            case "mousedown":
                e.preventDefault();
                break;
            default:
                break;
        }
    };
    const onTakePicBtnClick = () => {
        console.log("사진 찍히니 ~");
        shuttersound.play().catch(e => {
            console.log(e);
        });

        socket.emit("click_shutter", idx);
    };

    return (
        <>
            {isMobile ? (
                <IoRadioButtonOnOutline
                    id="takePicBtn"
                    className="btn-shadow"
                    color="red"
                    size="40px"
                    padding="5px 0"
                    style={{ position: "fixed", left: "50%", transform: "translateX( -50% )" }}
                    onTouchStart={onTakePicBtnTouch}
                    onTouchEnd={onTakePicBtnTouch}
                ></IoRadioButtonOnOutline>
            ) : (
                <IoRadioButtonOnOutline
                    id="takePicBtn"
                    className="btn-shadow"
                    color="red"
                    size="40px"
                    padding="5px 0"
                    style={{ position: "fixed", left: "50%", transform: "translateX( -50% )" }}
                    onClick={onTakePicBtnClick}
                ></IoRadioButtonOnOutline>
            )}
        </>
    );
}
export default TakePicBtn;
