import CreateRoomBtn from "../components/Btn/CreateRoomBtn";
import EnterRoomBtn from "../components/Btn/EnterRoomBtn";
import { Container, ButtonGroup } from "rsuite";
import "../style/style.css";
import { useParams } from "react-router-dom";
import store from "../store";
import { setNickNameInfo } from "../slice/membersInfo";

function Lobby() {
    const { nickname } = useParams();
    store.dispatch(setNickNameInfo({ value: nickname }));
    return (
        <Container className="color_container">
            <CreateRoomBtn />
            <EnterRoomBtn />
        </Container>
    );
}
export default Lobby;
