import Title from "../components/Title/Title";
import Logo from "./../components/Logo/Logo";
import LoginBtn from "../components/Btn/LoginBtn";
import { Link } from "react-router-dom";
import { Container } from "rsuite";
const Home = () => {
  return (
    <Container className="default_container">
      <Title />
      <Logo />
      <Link to={"/login"}>
        <LoginBtn />
      </Link>
      {/* 임의로 넣어 놓은 버튼 */}
      <Link to={"/room"}>
        <button>room</button>
      </Link>
    </Container>
  );
};

export default Home;
