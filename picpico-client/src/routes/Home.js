import Title from "../components/Title/Title";
import Logo from "./../components/Logo/Logo";
import LoginBtn from "../components/Btn/LoginBtn";
import { Link } from "react-router-dom";
import { Container } from "rsuite";
import "../style/style.css";
import { isMobile } from "react-device-detect";

const Home = () => {
    return (
        <Container className="color_container">
            <Title />
            <Logo />
            <Link to={"/login"}>
                <LoginBtn />
            </Link>
            <Link to={"/lobby/user"}>
                <button>room</button>
            </Link>
            {isMobile ? <div>당신은 모바일 환경에서 접속했습니다.</div> : null}
        </Container>
    );
};

export default Home;
