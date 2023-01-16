import { Button, FlexboxGrid } from "rsuite";
import { useState } from "react";
import EnterRoomForm from "../Form/EnterRoomForm";

function EnterRoomBtn() {
  const [formDisplay, setFormDisplay] = useState(false);
  function onEnterRoomBtnClick() {
    console.log("enterRoom");
    setFormDisplay(prev => !prev);
  }
  return (
    <>
      {formDisplay ? (
        <EnterRoomForm />
      ) : (
        <FlexboxGrid className="room_btn">
          <Button
            className="btn-shadow"
            style={{ width: "250px", color: "black", padding: "10px 70px", borderRadius: "6px", lineHeight: "15px", margin: "5px 0" }}
            onClick={onEnterRoomBtnClick}
          >
            방 코드 입력 후 입장
          </Button>
        </FlexboxGrid>
      )}
    </>
  );
}
export default EnterRoomBtn;
