import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const selectionInfo = createSlice({
    name: "selectionInfo",
    initialState: {
        imgList: {},
        selected: "",
    },

    reducers: {
        setImgListInfo(state, action) {
            state.imgList = action.payload.value;
        },
        setSelectedInfo(state, action) {
            state.selected = action.payload.value;
        },
    },
});

export let { setImgListInfo, setSelectedInfo } = selectionInfo.actions;

export default selectionInfo;
