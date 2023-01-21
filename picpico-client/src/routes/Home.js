import Title from "../components/Title/Title";
import Logo from "./../components/Logo/Logo";
import LoginBtn from "../components/Btn/LoginBtn";
import { Link } from "react-router-dom";
import { Container } from "rsuite";
import "../style/style.css";

const Home = () => {
    return (
        <Container className="default_container">
            <Title />
            <Logo />
            <Link to={"/login"}>
                <LoginBtn />
            </Link>
            <Link to={"/lobby/user"}>
                <button>아무꺼나</button>
            </Link>
        </Container>
    );
};

export default Home;
