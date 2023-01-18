import { Container, FlexboxGrid } from "rsuite";
import DecoCanvas from "../components/Canvas/DecoCanvas";

import ColorList from "../components/List/ColorList";

// import { useEffect } from "react";
// import store from "../store";
// import { setErrorInfo } from "../slice/errorInfo";

const Decoration = () => {
  // useEffect(() => {
  //   store.dispatch(setErrorInfo(""));
  // }, []);
  return (
    <>
      <DecoCanvas style={{ margin: "auto", width: "1000px" }} />
    </>
  );
};

export default Decoration;
