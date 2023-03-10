import Title from "../components/Title/Title";
import Logo from "./../components/Logo/Logo";
import LoginBtn from "../components/Btn/LoginBtn";
import { Link } from "react-router-dom";
import { Container } from "rsuite";
import "../style/style.css";

const Home = () => {
    return (
        <Container className="color_container">
            <Title />
            <Logo />
            <Link to={"/login"}>
                <LoginBtn />
            </Link>
        </Container>
    );
};

export default Home;
