import { Button } from "rsuite";

function LoginBtn() {
  const onKakaoLogin = () => {
    console.log("카카오 로그인 입니당");
    // Kakao.Auth.login({});
  };
  return (
    <div style={{ margin: "10px" }}>
      <Button
        block
        className="yellow_btn"
        onClick={onKakaoLogin}
        color="yellow"
        appearance="primary"
        style={{ color: "black", padding: "10px 70px" }}
      >
        카카오 로그인
      </Button>
    </div>
  );
}

export default LoginBtn;
