import { useDispatch, useSelector } from "react-redux";
import { handleMuteClick } from "../../modules/stream.mjs";
import { setMutedInfo } from "../../slice/picpicoInfo.js";
import mic from "./../../assets/images/icon-mic.png";
import mute from "./../../assets/images/icon-mute.png";

function MuteBtn() {
    const dispatch = useDispatch();
    const isMuted = useSelector(state => state.picpicoInfo.isMuted);

    const onMuteOnOff = () => {
        handleMuteClick(isMuted);
        dispatch(setMutedInfo({ value: !isMuted }));
        console.log("mute on off");
    };
    return (
        <>
            {isMuted ? (
                <img src={mic} className="drop-shadow" style={{ width: "40px", height: "40px" }} onClick={onMuteOnOff} />
            ) : (
                <img src={mute} className="drop-shadow" style={{ width: "40px", height: "40px" }} onClick={onMuteOnOff} />
            )}
        </>
    );
}
export default MuteBtn;
