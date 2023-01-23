import { useDispatch, useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { socket } from "../../modules/sockets.mjs";
import shutterSound from "./../../assets/sound/shutter.mp3";
import "./TakePicBtn.css";
import { setIdxCount } from "../../slice/takepicInfo";
export let TakePicCount;

function TakePicBtn() {
    const idx = useSelector(state => state.takepicInfo.idx);

    const shuttersound = new Audio(shutterSound);
    const onTakePicBtnClick = () => {
        TakePicCount = setIdxCount({ value: parseInt(idx) + 1 });
        TakePicCount = TakePicCount.payload.value;
        console.log("몇 번 찍히니", TakePicCount.payload.value);
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
