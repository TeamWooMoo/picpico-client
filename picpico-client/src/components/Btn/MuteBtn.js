import { useState } from "react";
import { IoVolumeMedium } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import { handleMuteClick } from "../../modules/stream.mjs";

function MuteBtn() {
    const [muted, setMuted] = useState(true);
    const onMuteOnOff = () => {
        setMuted(current => !current);
        handleMuteClick(muted);
        console.log("mute on off");
    };
    return (
        <>
            {" "}
            {muted ? (
                <IoVolumeMedium style={{}} className="drop-shadow" color="white" size="40" padding="5px 0" onClick={onMuteOnOff}></IoVolumeMedium>
            ) : (
                <IoVolumeMute className="drop-shadow" color="white" size="40" padding="5px 0" onClick={onMuteOnOff}></IoVolumeMute>
            )}
        </>
    );
}
export default MuteBtn;
