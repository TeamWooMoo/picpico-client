import { Button } from "rsuite";
import { useState } from "react";

function TakePicBtn() {
  const [taked, setTaked] = useState(true);
  const onTakePic = () => {
    console.log("take pic");
    setTaked((current) => !current);
  };
  return (
    <>
      <Button
        block
        size="sm"
        color="violet"
        appearance="primary"
        className="violet_btn"
        onClick={onTakePic}
      >
        사진 찍는 버튼
      </Button>
    </>
  );
}
export default TakePicBtn;
