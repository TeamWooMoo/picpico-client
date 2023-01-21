import React from "react";
import { FlexboxGrid } from "rsuite";

function SelectMessage() {
    return (
        <div>
            <FlexboxGrid justify="center">
                <h4 style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#7986CB", textAlign: "center" }}>Select Pictures</h4>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <p style={{ color: "black", textAlign: "center" }}>Pick the best 4 cut</p>
            </FlexboxGrid>
        </div>
    );
}

export default SelectMessage;
