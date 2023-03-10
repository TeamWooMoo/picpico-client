import axios from "axios";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { Button, FlexboxGrid } from "rsuite";
import { API } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { setRoomInfo } from "../../slice/roomInfo";
import { socket } from "../../modules/sockets.mjs";
import { setKingInfo } from "../../slice/membersInfo";
import { useState } from "react";

function CreateRoomBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nickName = useSelector(state => state.membersInfo.nickname);
    const [clicked, setClicked] = useState(false);
    const [touched, setTouched] = useState(false);

    const onCreateBtnTouch = e => {
        e.preventDefault();
        setTouched(true);
        const roomId = uuid();
        dispatch(setKingInfo({ value: true }));
        dispatch(setRoomInfo({ value: roomId }));
        axios
            .post(API.ROOM, { roomId: roomId, nickname: nickName, socketId: socket.id })
            .then(res => {
                //    서버가 어떻게 주는지에 따라서 아래는 바뀔 것
                console.log(res);
                navigate(`/room/${res.data.roomId}`);
                // navigate(`/room/100`);
            })
            .catch(err => {
                setTouched(false);
                alert("방 생성에 실패하였습니다.", err);
            });
    };

    function onCreateBtnClick() {
        setClicked(true);
        console.log("clicked!");
        const roomId = uuid();
        dispatch(setKingInfo({ value: true }));
        dispatch(setRoomInfo({ value: roomId }));
        // response가 오기 전에 방 생성 버튼이 다시 눌리는 경우 // 클릭 이벤트 -> 버튼 disabled 시키기
        axios
            .post(API.ROOM, { roomId: roomId, nickname: nickName, socketId: socket.id })
            .then(res => {
                //    서버가 어떻게 주는지에 따라서 아래는 바뀔 것
                console.log(res);
                navigate(`/room/${res.data.roomId}`);
            })
            .catch(err => {
                setClicked(false);
                alert("방 생성에 실패하였습니다.", err);
            });
    }
    return (
        <>
            <FlexboxGrid justify="center">
                <h4
                    style={{
                        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                        color: "#7986CB",
                        textAlign: "center",
                        width: "250px",
                        fontWeight: "bolder",
                    }}
                >
                    PicPiCo Enter Room
                </h4>
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
                    style={{
                        width: "250px",
                        color: "black",
                        borderRadius: "6px",
                        padding: "10px 70px",
                        lineHeight: "15px",
                        margin: "5px 0",
                        fontWeight: "600",
                    }}
                    onClick={clicked ? null : onCreateBtnClick}
                    onTouchEnd={touched ? null : onCreateBtnTouch}
                >
                    새로운 방 생성
                </Button>
            </FlexboxGrid>
        </>
    );
}
export default CreateRoomBtn;
