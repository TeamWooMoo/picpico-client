import Title from "../components/Title/Title";
import Logo from "./../components/Logo/Logo";
import LoginBtn from "../components/Btn/LoginBtn";
import { Link } from "react-router-dom";
import { Container } from "rsuite";
import { useEffect, useRef } from "react";
import "../style/style.css";
const Home = () => {
  const canvas1 = useRef();

  const canvas2 = useRef();

  // useEffect(() => {
  //   const ctx1 = canvas1.current.getContext("2d");
  // }, []);
  // const ctx1 = canvas1.current.getContext("2d");

  function onCanvas2Click(event) {
    console.log("x:", event.offsetX);
    console.log("y:", event.offsetY);
  }

  return (
    <Container className="default_container">
      {/* <div className="twocanvas" style={{ position: "relative" }}>
        <canvas
          classNAme="onecanvas"
          id="canvas1"
          ref={canvas1}
          style={{ position: "absolute", top: "0px", left: "10px" }}
        ></canvas>
        <canvas
          classNAme="onecanvas"
          id="canvas2"
          ref={canvas2}
          style={{ position: "absolute", top: "0px", left: "10px" }}
          onClick={onCanvas2Click}
        ></canvas>
      </div> */}

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
