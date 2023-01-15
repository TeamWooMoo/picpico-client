import Title from "../components/Title/Title";
import Logo from "./../components/Logo/Logo";
import LoginBtn from "../components/Btn/LoginBtn";
import { Link } from "react-router-dom";
import { Container } from "rsuite";
import { useEffect, useRef, useState } from "react";
import "../style/style.css";
const Home = () => {
  const canvas1 = useRef();

  const canvas2 = useRef();
  const [painting, setPainting] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [currX, setCurrX] = useState(0);
  const [currY, setCurrY] = useState(0);

  const onCanvasDown = event => {
    // console.log(event);
    setPainting(true);
  };

  const onCanvasUp = event => {
    // console.log(event);
    setPainting(false);
  };

  function onCanvasMove(event) {
    console.log(event);
    // console.log("x:", event.clientX);
    // console.log("y:", event.clientY);
    setCurrX(event.clientX);
    setCurrY(event.clientY);
    // currX = event.offsetX;
    // currY = event.offsetY;
  }
  useEffect(() => {
    const ctx1 = canvas1.current.getContext("2d");
    // console.log("context1: ", ctx1);
    // console.log(painting);
    if (painting) {
      ctx1.beginPath();
      ctx1.moveTo(prevX, prevY);
      ctx1.lineTo(currX, currY);
      console.log(prevX, "->", currX);
      console.log(prevY, "->", currY);
      ctx1.strokeStyle = "black";
      ctx1.stroke();
      ctx1.closePath();
    }
  }, [currX, currY, painting]);

  return (
    <Container className="default_container">
      <div className="twocanvas" style={{ position: "relative" }}>
        <canvas
          classNAme="onecanvas"
          id="canvas1"
          ref={canvas1}
          style={{
            position: "absolute",
            top: "0px",
            left: "10px",
            border: "1px solid black",
            width: "300",
            height: "300",
          }}
        ></canvas>
        <canvas
          classNAme="onecanvas"
          id="canvas2"
          ref={canvas2}
          style={{
            position: "absolute",
            top: "0px",
            left: "10px",
            border: "1px solid red",
            width: "300",
            height: "300",
          }}
          onMouseDown={onCanvasDown}
          onMouseMove={onCanvasMove}
          onMouseUp={onCanvasUp}
        ></canvas>
      </div>

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
