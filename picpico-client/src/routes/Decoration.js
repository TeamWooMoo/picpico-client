import MemberList from "../components/List/MemberList";
import DecoList from "../components/List/DecoList";
import ColorList from "../components/List/ColorList";
import DecoCanvas from "../components/Canvas/DecoCanvas";
import { useEffect } from "react";
import store from "../store";
import { setErrorInfo } from "../slice/errorInfo";

const Decoration = ({ controller }) => {
  useEffect(() => {
    store.dispatch(setErrorInfo(""));
  }, []);
  return (
    <>
      <MemberList />
      <DecoCanvas controller={controller} />
      <DecoList controller={controller} />
      <ColorList />
    </>
  );
};

export default Decoration;
