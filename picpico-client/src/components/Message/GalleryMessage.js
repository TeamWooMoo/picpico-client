import React from "react";
import { FlexboxGrid } from "rsuite";

function GalleryMessage() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <h5 style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Download Picture</h5>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center" }}>Remember your PicPiCo moment</p>
      </FlexboxGrid>
    </div>
  );
}

export default GalleryMessage;
