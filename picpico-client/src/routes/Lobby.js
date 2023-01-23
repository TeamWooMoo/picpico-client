import CreateRoomBtn from "../components/Btn/CreateRoomBtn";
import EnterRoomBtn from "../components/Btn/EnterRoomBtn";
import { Container } from "rsuite";
import { useParams } from "react-router-dom";
import store from "../store";
import { setNickNameInfo } from "../slice/membersInfo";
import "../style/style.css";

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
