import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const videosInfo = createSlice({
    name: "videosInfo",
    initialState: {
        videos: [],
        // isOnOffCam: true,
    },

    reducers: {
        setVideosInfo(state, action) {
            console.log("setVideosInfo");
            state.videos = state.videos.filter(video => video !== action.payload.value);
        },
        // setOnOffVideosInfo(state, action) {
        //     console.log("되니 ...");
        //     state.isOnOffCam = action.payload.value;
        // },
    },
});

export let { setVideosInfo } = videosInfo.actions;

export default videosInfo;
