import { useState } from "react";
import mic_btn from "./../../assets/images/icon-mic.png";
import mute_btn from "./../../assets/images/icon-mute.png";

function MuteBtn() {
    const [muted, setMuted] = useState(true);
    const onMuteOnOff = () => {
        console.log("mute on off");
        setMuted(current => !current);
    };
    return (
        <>
            {" "}
            {muted ? (
                <img src={mic_btn} className="drop-shadow" style={{ width: "40px", height: "40px" }} onClick={onMuteOnOff} />
            ) : (
                <img src={mute_btn} className="drop-shadow" style={{ width: "40px", height: "40px" }} onClick={onMuteOnOff} />
            )}
        </>
    );
}
export default MuteBtn;
