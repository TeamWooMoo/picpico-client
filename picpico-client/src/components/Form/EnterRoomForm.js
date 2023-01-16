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
      <Form.ControlLabel style={{ padding: "5px" }}>방 코드를 입력하세요.</Form.ControlLabel>
      <Input
        className="btn-shadow"
        placeholder="Room Code"
        onChange={onRoomInputChange}
        style={{ width: "250px", color: "black", padding: "10px", borderRadius: "6px", lineHeight: "15px", margin: "5px 0" }}
      />
    </Form>
  );
}
export default EnterRoomForm;
