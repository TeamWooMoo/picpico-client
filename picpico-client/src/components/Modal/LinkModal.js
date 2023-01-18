import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button, ButtonToolbar } from "rsuite";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shareKakao } from "../Btn/KakaoShareBtn";
import { flexbox } from "@mui/system";

function LinkModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 여기는 확인해봐야함
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const room_num = pathname.replace("/room/", "");

  const onLinkCopy = () => {
    try {
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (error) {
      alert("클립보드에 링크가 실패하였습니다.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <Button className="btn-shadow" onClick={handleOpen} style={{ lineHeight: "15px", margin: "5px 0" }}>
        Link 🔗
      </Button>
      <Modal open={open} onClose={handleClose} style={{ justifyContent: "center", textAlign: "center", width: "250" }}>
        <Modal.Header>
          <Modal.Title>🔜 친구들에게 방 링크를 공유해보세요. </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "black", textAlign: "center", margin: "10px 0" }}>
            해당 링크로 여러명의 친구를 한번에 초대할 수 있습니다.
            <br />
          </p>
          <img
            width="30px"
            height="30px"
            className="w-12 h-12"
            src={"https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"}
            alt={"카카오톡 공유하기"}
            onClick={() => shareKakao(window.location.href)}
          />
          <CopyToClipboard text={url}>
            <Button block style={{ color: "black", lineHeight: "15px", margin: "10px 0" }} className="btn-shadow" onClick={onLinkCopy}>
              🔗 링크 생성
            </Button>
          </CopyToClipboard>
          <CopyToClipboard text={room_num}>
            <Button block style={{ color: "black", lineHeight: "15px", margin: "10px 0" }} className="btn-shadow">
              📲 방 번호
            </Button>
          </CopyToClipboard>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-shadow" style={{ color: "black", lineHeight: "15px" }} onClick={handleClose}>
            OK
          </Button>
          <Button className="btn-shadow" onClick={handleClose} appearance="default" style={{ lineHeight: "15px" }}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LinkModal;
