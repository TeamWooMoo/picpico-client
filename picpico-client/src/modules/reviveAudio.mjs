import { myPeers } from "../controller/MainController.js";

export function reviveAudio() {
    // myPeers
    const audioRow = document.getElementsByClassName("audioRow")[0];

    for (const [_, myPeer] of Object.entries(myPeers)) {
        const newAudio = document.createElement("audio");

        newAudio.srcObject = myPeer.mediaStream;
        newAudio.play();

        audioRow.appendChild(newAudio);
    }

    console.log("audio revival");
}
