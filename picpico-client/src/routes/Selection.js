import { useEffect } from "react";
import { useSelector } from "react-redux";
import SelectList from "../components/List/SelectList";
import { setErrorInfo } from "../slice/errorInfo";
import store from "../store";

const Selection = () => {
    return (
        <>
            <SelectList />
        </>
    );
};

export default Selection;
