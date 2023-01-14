import { useState } from "react";
import { Button } from "rsuite";

function MuteBtn() {
  const [muted, setMuted] = useState(true);
  const onMuteOnOff = () => {
    console.log("mute on off");
    setMuted((current) => !current);
  };
  return (
    <>
      <Button
        block
        size="sm"
        color="violet"
        appearance="primary"
        className="violet_btn"
        onClick={onMuteOnOff}
      >
        {muted ? "Mute" : "Unmute"}
      </Button>
    </>
  );
}
export default MuteBtn;
