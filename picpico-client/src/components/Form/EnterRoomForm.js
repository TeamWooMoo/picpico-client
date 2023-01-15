import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Input } from "rsuite";
import { API } from "../../config";

function EnterRoomForm() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  function onRoomInputChange(event) {
    setRoomId(event);
  }

  function onEnterRoomFormSubmit(event) {
    // event.preventDefault();
    console.log(event);
    axios
      .get(API.ROOM + roomId)
      .then(res => {
        const roomName = res.data.roomId;
        navigate(`/room/${roomName}`);
      })
      .catch(error => {
        alert("해당 코드의 방이 존재하지 않습니다.");
      });
  }
  return (
    <Form onSubmit={onEnterRoomFormSubmit}>
      <Form.ControlLabel style={{ padding: "5px" }}>방 코드를 입력하세요.</Form.ControlLabel>
      <Input placeholder="Room Code" onChange={onRoomInputChange} style={{ borderRadius: "20px", margin: "5px 0" }} />
    </Form>
  );
}
export default EnterRoomForm;
