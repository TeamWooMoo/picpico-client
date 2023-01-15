import React from "react";
import { useState } from "react";
import { Modal, Button, ButtonToolbar } from "rsuite";
import { CopyToClipboard } from "react-copy-to-clipboard";

function LinkModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const url = window.location.href;
  // 여기는 확인해봐야함
  const onLinkCopy = () => {
    try {
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (error) {
      alert("클립보드에 링크가 실패하였습니다.");
    }
  };

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen} style={{ margin: "5px 0" }}>
          📍 링크 복사 📍
        </Button>
      </ButtonToolbar>
      <Modal open={open} onClose={handleClose} style={{ justifyContent: "center", textAlign: "center" }}>
        <Modal.Header>
          <Modal.Title>🔜 친구들에게 방 링크를 공유해보세요. </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "black", textAlign: "center" }}>
            해당 링크로 여러명의 친구를 한번에 초대할 수 있습니다.
            <br />
          </p>
          <CopyToClipboard text={url}>
            <Button block style={{ color: "black" }} appearance="primary" className="link_copy" onClick={onLinkCopy}>
              🔗 링크 생성
            </Button>
          </CopyToClipboard>
          <Button block style={{ color: "black" }} appearance="primary" className="link_copy">
            📥 카카오톡 전송
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} color="violet" appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LinkModal;
