import CreateRoomBtn from "../components/Btn/CreateRoomBtn";
import EnterRoomBtn from "../components/Btn/EnterRoomBtn";
import { Container, ButtonGroup } from "rsuite";
import "../style/style.css";

function Room() {
  return (
    <Container className="default_container">
      <ButtonGroup>
        <CreateRoomBtn />
        <EnterRoomBtn />
      </ButtonGroup>
    </Container>
  );
}
export default Room;
