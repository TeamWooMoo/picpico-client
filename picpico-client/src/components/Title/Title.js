import React from "react";
import { FlexboxGrid } from "rsuite";
import "./Title.css";

function Title() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <h1 className="intro" style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "black", textAlign: "center" }}>
          PicPiCo
        </h1>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <h5 className="intro" style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#204675", textAlign: "center" }}>
          : take Pictures with Peer Connection
        </h5>
      </FlexboxGrid>
    </div>
  );
}

export default Title;
