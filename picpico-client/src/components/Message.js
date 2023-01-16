import React from "react";
import { FlexboxGrid } from "rsuite";

function Message() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center", padding: "20px" }}>
          📌 Choose Picture 📌
          <br />
          <p>사진 4장을 고르세요.</p>
        </p>
      </FlexboxGrid>
    </div>
  );
}

export default Message;
