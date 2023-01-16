import React from "react";
import axios from "axios";
import { API } from "../../config";
import { Button } from "rsuite";

function LoginBtn() {
  function onKakaoLogin() {
    axios
      .get(API.KAKAOLOGIN)

      .then(res => {
        const rescheck = res;
        window.location.href = rescheck.data.url;
      })
      .catch(err => {
        alert("로그인에 실패하였습니다.");
      });
  }
  return (
    <Button
      block
      className="btn-shadow"
      onClick={onKakaoLogin}
      color="yellow"
      appearance="primary"
      style={{ color: "black", padding: "10px 70px", margin: "10px 0" }}
    >
      카카오 로그인
    </Button>
  );
}

export default LoginBtn;
