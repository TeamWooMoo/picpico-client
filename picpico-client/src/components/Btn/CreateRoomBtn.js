import axios from "axios";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { Button, FlexboxGrid } from "rsuite";
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
    <>
      <FlexboxGrid justify="center">
        <h4 style={{ color: "black", textAlign: "center" }}>PicPiCo 방 입장</h4>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center", padding: "10px" }}>
          1. 새로운 방을 생성하세요.
          <br />
          2. 이미 방이 생성되어있다면 코드를 입력 후 입장하세요.
        </p>
      </FlexboxGrid>
      <Button
        block
        color="violet"
        appearance="primary"
        onClick={onCreateBtnClick}
        className="violet_btn"
        style={{ color: "black", padding: "10px 70px", borderRadius: "20px", padding: "5px", margin: "5px 0" }}
      >
        새로운 방 생성
      </Button>
    </>
  );
}
export default CreateRoomBtn;
