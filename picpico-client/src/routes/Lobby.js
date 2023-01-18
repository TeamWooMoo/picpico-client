import CreateRoomBtn from "../components/Btn/CreateRoomBtn";
import EnterRoomBtn from "../components/Btn/EnterRoomBtn";
import { Container, ButtonGroup } from "rsuite";
import "../style/style.css";

function Lobby() {
  return (
    <Container className="default_container">
      <CreateRoomBtn />
      <EnterRoomBtn />
    </Container>
  );
}
export default Lobby;
