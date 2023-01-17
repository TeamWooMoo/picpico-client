import React from "react";
import { FlexboxGrid } from "rsuite";

function SelectMessage() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <h5 style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Select Pictures</h5>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center" }}>Pick the best 4 cut</p>
      </FlexboxGrid>
    </div>
  );
}

export default SelectMessage;
