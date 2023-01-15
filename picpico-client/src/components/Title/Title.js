import React from "react";
import { FlexboxGrid } from "rsuite";
import "./Title.css";

function Title() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <h1 className="intro" style={{ color: "black", textAlign: "center" }}>
          PicPiCo
        </h1>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <h6 className="intro" style={{ color: "#204675", textAlign: "center" }}>
          : take Pictures with Peer Connection
        </h6>
      </FlexboxGrid>
    </div>
  );
}

export default Title;
