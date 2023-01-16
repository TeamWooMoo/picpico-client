import axios from "axios";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { Button, FlexboxGrid } from "rsuite";
import { API } from "../../config";
import { useDispatch } from "react-redux";
import { setRoomInfo } from "../../slice/roomInfo";

function CreateRoomBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onCreateBtnClick() {
    const roomId = uuid();

    dispatch(setRoomInfo({ value: roomId }));
    axios
      .post(API.ROOM, { roomId: roomId, nickname: "king" })
      .then(res => {
        //    서버가 어떻게 주는지에 따라서 아래는 바뀔 것
        console.log(res);
        navigate(`/room/${res.data.roomId}`);
        // navigate(`/room/100`);
      })
      .catch(err => {
        alert("방 생성에 실패하였습니다.", err);
      });
  }
  return (
    <>
      <FlexboxGrid justify="center">
        <h4 style={{ width: "250px", color: "black", fontWeight: "bold", textAlign: "center" }}>PicPiCo Enter Room</h4>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center", padding: "20px" }}>
          1. 새로운 방을 생성하세요.
          <br />
          2. 이미 방이 생성되어있다면 코드를 입력 후 입장하세요.
        </p>
      </FlexboxGrid>
      <FlexboxGrid className="room_btn">
        <Button
          className="btn-shadow"
          style={{ width: "250px", color: "black", borderRadius: "6px", padding: "10px 70px", lineHeight: "15px", margin: "5px 0" }}
          onClick={onCreateBtnClick}
        >
          새로운 방 생성
        </Button>
      </FlexboxGrid>
    </>
  );
}
export default CreateRoomBtn;
