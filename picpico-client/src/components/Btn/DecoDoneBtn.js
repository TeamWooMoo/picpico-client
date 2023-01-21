import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { setDoneDecoInfo } from "../../slice/decoInfo.js";
import next_btn from "./../../assets/images/icon-next.png";

const DecoDoneBtn = () => {
    const dispatch = useDispatch();
    const isKing = useSelector(state => state.membersInfo.king);
    const roomId = useSelector(state => state.roomInfo.room);

    function onDecoDoneBtnClick() {
        socket.emit("done_deco", roomId, socket.id);
        console.log("done deco");
        dispatch(setDoneDecoInfo({ value: true }));
    }
    return <img src={next_btn} className={isKing ? "btn-shadow" : "btn-deactivate"} style={{ width: "40px", height: "40px" }} onClick={onDecoDoneBtnClick} />;
};

export default DecoDoneBtn;
