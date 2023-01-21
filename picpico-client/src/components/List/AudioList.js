import React, { useEffect } from "react";
import { reviveAudio } from "../../modules/reviveAudio.mjs";

export default function AudioList() {
    useEffect(() => {
        reviveAudio();
    }, []);

    return (
        <div className="audioRow" hidden="true">
            audioOnTest
        </div>
    );
}
