import MemberList from "../components/List/MemberList";

import DecoCanvas from "../components/Canvas/DecoCanvas";
import { useEffect } from "react";
import store from "../store";
import { setErrorInfo } from "../slice/errorInfo";

const Decoration = () => {
  // useEffect(() => {
  //   store.dispatch(setErrorInfo(""));
  // }, []);
  return (
    <>
      <MemberList />
      <DecoCanvas />
    </>
  );
};

export default Decoration;
