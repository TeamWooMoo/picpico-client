import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Input } from "rsuite";
import { API } from "../../config";
import { useDispatch } from "react-redux";
import { setRoomInfo } from "../../slice/roomInfo";
function EnterRoomForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  function onRoomInputChange(event) {
    setRoomId(event);
  }

  function onEnterRoomFormSubmit(event) {
    console.log(event);
    axios
      .get(API.ROOM + roomId)
      .then(res => {
        console.log("res:", res);
        const roomName = res.data.roomId;
        dispatch(setRoomInfo({ value: roomName }));
        navigate(`/room/${roomName}`);
      })
      .catch(() => {
        alert("없는 방 번호 입니다.");
      });
  }
  return (
    <Form onSubmit={onEnterRoomFormSubmit}>
      <Form.ControlLabel>Enter room Code</Form.ControlLabel>
      <Input placeholder="room code" onChange={onRoomInputChange} />
    </Form>
  );
}
export default EnterRoomForm;
