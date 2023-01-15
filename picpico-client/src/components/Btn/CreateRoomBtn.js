import axios from "axios";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";
import { API } from "../../config";

function CreateRoomBtn() {
  const navigate = useNavigate();
  function onCreateBtnClick() {
    const roomId = uuid();
    axios
      .post(API.ROOM, { roomId: roomId })
      .then(res => {
        //    서버가 어떻게 주는지에 따라서 아래는 바뀔 것
        console.log(res);
        navigate(`/room/${res.data.roomId}`);
        // navigate(`/room/100`);
      })
      .catch(err => {
        alert("방 생성에 실패하였습니다,", err);
      });
  }
  return (
    <Button
      block
      color="violet"
      appearance="primary"
      onClick={onCreateBtnClick}
      className="violet_btn"
      style={{ color: "black", padding: "10px 70px", margin: "10px" }}
    >
      새로운 방 생성
    </Button>
  );
}
export default CreateRoomBtn;
