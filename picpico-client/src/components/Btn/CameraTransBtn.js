import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setOnOffVideosInfo } from "./../../slice/videosInfo.js";
import { offVideoTrack } from "../../modules/stream.mjs";

const CameraTransBtn = () => {
    // 1. Redux
    // const dispatch = useDispatch();
    // const isOnOffCam = useSelector(state => state.videoInfo.isOnOffCam);

    // function onCameraOnOff() {
    //     console.log("카메라 전환");
    //     offVideoTrack(isOnOffCam);
    //     dispatch(setOnOffVideosInfo({ value: !isOnOffCam }));
    // }

    // 2. useStae
    const [cameraTrans, setCameraTrans] = useState(false);

    function onCameraOnOff() {
        console.log("카메라 전환");
        // offVideoTrack();
        setCameraTrans(current => !current);
    }

    return (
        <>
            {cameraTrans ? (
                <FiCamera className="drop-shadow" color="white" size="30px" padding="5px 0" onClick={onCameraOnOff}></FiCamera>
            ) : (
                <FiCameraOff className="drop-shadow" color="white" size="30px" padding="5px 0" onClick={onCameraOnOff}></FiCameraOff>
            )}
            {/* {isOnOffCam ? (
                <FiCamera className="drop-shadow" color="white" size="30px" padding="5px 0" onClick={onCameraOnOff}></FiCamera>
            ) : (
                <FiCameraOff className="drop-shadow" color="white" size="30px" padding="5px 0" onClick={onCameraOnOff}></FiCameraOff>
            )} */}
        </>
    );
};

export default CameraTransBtn;
