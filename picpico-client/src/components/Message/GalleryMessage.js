import React from "react";
import { FlexboxGrid } from "rsuite";

function GalleryMessage() {
    return (
        <div>
            <FlexboxGrid justify="center">
                <h4 style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#7986CB", textAlign: "center" }}>Download Picture</h4>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <p style={{ color: "black", textAlign: "center" }}>Remember your PicPiCo moment</p>
            </FlexboxGrid>
        </div>
    );
}

export default GalleryMessage;
