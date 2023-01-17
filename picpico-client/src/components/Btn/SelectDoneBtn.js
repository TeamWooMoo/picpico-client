import {Button, Footer} from "rsuite";
import {useSelector} from "react-redux";
import {socket} from "../../modules/sockets.mjs";

const SelectDoneBtn = ({controller}) => {
    const roomId = useSelector(state => state.roomInfo.room);
    const isKing = useSelector(state => state.membersInfo.king);

    function onSelectDoneBtnClick() {
        socket.emit("done_pick", roomId, socket.id);
    }
    return (
        <Button className={isKing ? "btn-shadow" : "btn-deactivate"} style={{lineHeight: "15px", margin: "5px 0"}} onClick={onSelectDoneBtnClick}>
            Selection complete 👌
        </Button>
    );
};

export default SelectDoneBtn;
