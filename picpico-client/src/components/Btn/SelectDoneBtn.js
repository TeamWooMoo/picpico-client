import { Button, Footer } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { useEffect } from "react";
import { setErrorDiffInfo } from "../../slice/errorInfo.js";

const SelectDoneBtn = ({ controller }) => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.roomInfo.room);
  const isKing = useSelector(state => state.membersInfo.king);
  //errorDiff = 4개 미만 혹은 초과 고르고 해당 버튼 누르면 안됨
  // const errorDiff = useSelector(state => state.errorInfo.difference);
  // useEffect(() => {
  //   console.log("error", errorDiff);
  //   alert("사진 4장을 골라야 해요.");
  //   dispatch(setErrorDiffInfo({ value: false }));
  // }, [errorDiff]);

  function onSelectDoneBtnClick() {
    socket.emit("done_pick", roomId, socket.id);
    console.log("done pick!!");
    // dispatch(setErrorDiffInfo({ value: false }));
  }

  return (
    <Button className={isKing ? "btn-shadow" : "btn-deactivate"} style={{ lineHeight: "15px", margin: "5px 0" }} onClick={onSelectDoneBtnClick}>
      Selection complete 👌
    </Button>
  );
};

export default SelectDoneBtn;
