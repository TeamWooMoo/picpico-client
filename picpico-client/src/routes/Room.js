import CreateRoomBtn from "../components/Btn/CreateRoomBtn";
import EnterRoomBtn from "../components/Btn/EnterRoomBtn";
import { Container } from "rsuite";
// import "./Room.css";

function Room() {
  return (
    <Container className="default_container">
      <CreateRoomBtn />

      <EnterRoomBtn />
    </Container>
  );
}
export default Room;
