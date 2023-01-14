import { Button } from "rsuite";
import { useState } from "react";
import EnterRoomForm from "../Form/EnterRoomForm";

function EnterRoomBtn() {
  const [formDisplay, setFormDisplay] = useState(false);
  function onEnterRoomBtnClick() {
    console.log("enterRoom");
    setFormDisplay((prev) => !prev);
  }
  return (
    <>
      {formDisplay ? (
        <EnterRoomForm />
      ) : (
        <Button
          block
          color="violet"
          appearance="primary"
          className="violet_btn"
          onClick={onEnterRoomBtnClick}
        >
          방 코드 입력 후 입장
        </Button>
      )}
    </>
  );
}
export default EnterRoomBtn;
