import { useEffect } from "react";
import SelectList from "../components/List/SelectList";
import { setErrorInfo } from "../slice/errorInfo";
import store from "../store";

const Selection = ({ controller }) => {
  useEffect(() => {
    store.dispatch(setErrorInfo(""));
  }, []);
  return (
    <>
      <SelectList controller={controller} />
    </>
  );
};

export default Selection;
