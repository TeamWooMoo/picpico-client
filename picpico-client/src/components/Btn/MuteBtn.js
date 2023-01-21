import { useState } from "react";
import { handleMuteClick } from "../../modules/stream.mjs";
import mic from "./../../assets/images/icon-mic.png";
import mute from "./../../assets/images/icon-mute.png";

function MuteBtn() {
    const [muted, setMuted] = useState(true);
    const onMuteOnOff = () => {
        setMuted(current => !current);
        handleMuteClick(muted);
        console.log("mute on off");
    };
    return (
        <>
            {muted ? (
                <img src={mic} className="drop-shadow" style={{ width: "40px", height: "40px" }} onClick={onMuteOnOff} />
            ) : (
                <img src={mute} className="drop-shadow" style={{ width: "40px", height: "40px" }} onClick={onMuteOnOff} />
            )}
        </>
    );
}
export default MuteBtn;
