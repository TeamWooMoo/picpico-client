import { Button, FlexboxGrid } from "rsuite";
import { useState } from "react";
import EnterRoomForm from "../Form/EnterRoomForm";

function EnterRoomBtn() {
    const [formDisplay, setFormDisplay] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [touched, setTouched] = useState(false);
    function onEnterRoomBtnClick() {
        setClicked(true);
        console.log("enterRoom click");
        setFormDisplay(prev => !prev);
    }

    const onEnterRoomBtnTouch = e => {
        e.preventDefault();
        setTouched(true);
        console.log("enterRoom touch");
        setFormDisplay(prev => !prev);
    };
    return (
        <>
            {formDisplay ? (
                <EnterRoomForm />
            ) : (
                <FlexboxGrid className="room_btn">
                    <Button
                        className="btn-shadow"
                        style={{
                            width: "250px",
                            color: "black",
                            padding: "10px 70px",
                            borderRadius: "6px",
                            lineHeight: "15px",
                            margin: "7px 0",
                            fontWeight: "600",
                        }}
                        onClick={clicked ? null : onEnterRoomBtnClick}
                        onTouchEnd={touched ? null : onEnterRoomBtnTouch}
                    >
                        방 코드 입력 후 입장
                    </Button>
                </FlexboxGrid>
            )}
        </>
    );
}
export default EnterRoomBtn;
