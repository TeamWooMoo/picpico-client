import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const picpicoInfo = createSlice({
    name: "picpicoInfo",
    initialState: {
        picBoothDisplay: true,
        selectionDisplay: false,
        decoDisplay: false,
        galleryDisplay: false,
        isMuted: true,
    },

    reducers: {
        setPicBoothInfo(state, action) {
            state.picBoothDisplay = action.payload.value;
        },
        setSelectionInfo(state, action) {
            state.selectionDisplay = action.payload.value;
        },
        setDecoInfo(state, action) {
            state.decoDisplay = action.payload.value;
        },
        setGalleryInfo(state, action) {
            state.galleryDisplay = action.payload.value;
        },
        setMutedInfo(state, action) {
            state.isMuted = action.payload.value;
        },
    },
});

export let { setPicBoothInfo, setSelectionInfo, setDecoInfo, setGalleryInfo, setMutedInfo } = picpicoInfo.actions;

export default picpicoInfo;
