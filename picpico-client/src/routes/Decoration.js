import "./Decoration.css";
import { FlexboxGrid } from "rsuite";
import MemberList from "../components/List/MemberList";
import DecoCanvas from "../components/Canvas/DecoCanvas";

// import { useEffect } from "react";
// import store from "../store";
// import { setErrorInfo } from "../slice/errorInfo";

const Decoration = () => {
  // useEffect(() => {
  //   store.dispatch(setErrorInfo(""));
  // }, []);
  return (
    <>
      <FlexboxGrid className="decoration">
        <MemberList />
        <DecoCanvas style={{ margin: "auto", width: "1000px" }} />
      </FlexboxGrid>
    </>
  );
};

export default Decoration;
