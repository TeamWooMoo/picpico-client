import React from "react";
import { FlexboxGrid } from "rsuite";

function Title() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <h1 style={{ color: "black" }}>PicPiCo</h1>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <h5 style={{ color: "#8BBCCC" }}>
          : take Pictures with Peer Connection
        </h5>
      </FlexboxGrid>
    </div>
  );
}

export default Title;
