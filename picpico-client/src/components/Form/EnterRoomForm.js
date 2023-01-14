import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Input } from "rsuite";
import { API } from "../../config";

function EnterRoomForm() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  function onRoomInputChange(event) {
    setRoomId(event.target.value);
  }

  function onEnterRoomFormSubmit(event) {
    event.preventDefault();
    axios
      .get(API.ROOM + roomId)
      .then((res) => {
        const roomName = res.data.roomId;
        navigate(`/room/${roomName}`);
      })
      .catch((error) => {
        alert("해당 코드의 방이 존재하지 않습니다.");
      });
  }
  return (
    <Form onSubmit={onEnterRoomFormSubmit}>
      <Form.ControlLabel>Enter room Code</Form.ControlLabel>
      <Input placeholde="room code" onChange={onRoomInputChange} />
    </Form>
  );
}
export default EnterRoomForm;
