import React from "react";
import { FlexboxGrid } from "rsuite";

function DecoMessage() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <h5 style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Decoration</h5>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center" }}>Deco your Pictures</p>
      </FlexboxGrid>
    </div>
  );
}

export default DecoMessage;
