import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setOnOffVideosInfo } from "../../slice/videosInfo.js";
import { offVideoTrack } from "../../modules/stream.mjs";

const TakePicCountMessage = () => {
    // const dispatch = useDispatch();
    // const isOnOffCam = useSelector(state => state.videoInfo.isOnOffCam);

    // function TakePicCount() {
    //     offVideoTrack(isOnOffCam);
    //     dispatch(setIdxCount({ value: !isOnOffCam }));
    // }

    return (
        <>
            <div color="white" className="drop-shadow" size="30px" padding="5px 0">
                되냐 ??{TakePicCount}
            </div>
        </>
    );
};

export default TakePicCountMessage;
