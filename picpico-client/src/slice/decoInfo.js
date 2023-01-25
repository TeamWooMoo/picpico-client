import { createSlice } from "@reduxjs/toolkit";
// state 수정 방법 아래에 명시
const decoInfo = createSlice({
    name: "decoInfo",
    initialState: {
        decoList: {},
        myDecoCanvas: "",
        decoMode: "stroke",
        colorList: ["#e74c3c", "#f1c40f", "#27ae60", "#2980b9", "#9b59b6"],
        doneDeco: false,
        resultList: [],
        realResultList: [],
        stickerList: [],
        stickerPointList: [],
        bgList: [],
    },

    reducers: {
        setDecoListInfo(state, action) {
            state.decoList = action.payload.value;
        },
        setMyDecoCanvasInfo(state, action) {
            state.myDecoCanvas = action.payload.value;
        },
        setDecoModeInfo(state, action) {
            state.decoMode = action.payload.value;
        },
        setDoneDecoInfo(state, action) {
            state.doneDeco = action.payload.value;
        },
        setResultInfo(state, action) {
            state.resultList = action.payload.value;
        },
        setRealResultInfo(state, action) {
            state.realResultList = action.payload.value;
        },
        setStickerInfo(state, action) {
            state.stickerList = [...state.stickerList, action.payload.value];
        },
        setStickerPointInfo(state, action) {
            state.stickerPointList = [...state.stickerPointList, action.payload.value];
        },
        setBgInfo(state, action) {
            state.bgList = [action.payload.value];
        },
    },
});

export let {
    setDecoListInfo,
    setMyDecoCanvasInfo,
    setDecoModeInfo,
    setDoneDecoInfo,
    setResultInfo,
    setRealResultInfo,
    setStickerInfo,
    setStickerPointInfo,
    setBgInfo,
} = decoInfo.actions;

export default decoInfo;
