import { useState } from "react";
import { Modal, Button, ButtonToolbar } from "rsuite";

function LinkModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onLinkCopy = () => {
    console.log("링크 복사");
  };

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen}>
          📍 친구들에게 방 링크를 공유해보세요. 📍
        </Button>
      </ButtonToolbar>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>🔜 친구들에게 방 링크를 공유해보세요. </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "black", margin: "10px" }}>
            해당 링크로 여러명의 친구를 한번에 초대할 수 있습니다.
            <br />
          </p>
          <Button
            block
            style={{ color: "black" }}
            appearance="primary"
            className="link_copy"
            onClick={onLinkCopy}
          >
            🔗 링크 생성
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
