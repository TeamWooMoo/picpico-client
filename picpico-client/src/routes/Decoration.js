import { FlexboxGrid } from "rsuite";
import DecoCanvas from "../components/Canvas/DecoCanvas";
import DecoList from "../components/List/DecoList";
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
      <FlexboxGrid>
        <DecoCanvas style={{ margin: "auto", width: "1000px" }} />
        <DecoList />
        <ColorList />
      </FlexboxGrid>
    </>
  );
};

export default Decoration;
