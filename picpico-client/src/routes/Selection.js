import { useEffect } from "react";
import { useSelector } from "react-redux";
import SelectList from "../components/List/SelectList";
import { offVideoTrack } from "../modules/stream.mjs";
import { setErrorInfo } from "../slice/errorInfo";
import store from "../store";

const Selection = () => {
    offVideoTrack();
    return (
        <>
            <SelectList />
        </>
    );
};

export default Selection;
