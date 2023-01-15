import { useState } from "react";
import mute from "./../../assets/images/mute.png";
import mic from "./../../assets/images/mic.png";

function MuteBtn() {
  const [muted, setMuted] = useState(true);
  const onMuteOnOff = () => {
    console.log("mute on off");
    setMuted(current => !current);
  };
  return <>{muted ? <img src={mute} size="10px" onClick={onMuteOnOff} /> : <img src={mic} size="10px" onClick={onMuteOnOff} />}</>;
}
export default MuteBtn;
