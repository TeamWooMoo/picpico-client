import DecoCanvas from "../components/Canvas/DecoCanvas";

import { useEffect } from "react";
import store from "../store";
import { setErrorInfo } from "../slice/errorInfo";
import DecoList from "../components/List/DecoList";
import { useSelector } from "react-redux";

const Decoration = () => {
  // useEffect(() => {
  //   store.dispatch(setErrorInfo(""));
  // }, []);
  return (
    <>
      <DecoCanvas style={{ margin: "auto", width: "1000px" }} />

      <DecoList />
    </>
  );
};

export default Decoration;
