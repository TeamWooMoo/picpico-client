import { useEffect } from "react";
import { useSelector } from "react-redux";
import SelectList from "../components/List/SelectList";
import { setErrorDiffInfo, setErrorInfo } from "../slice/errorInfo";
import store from "../store";

const Selection = () => {
  // useEffect(() => {
  //   store.dispatch(setErrorInfo(""));
  // }, []);

  const errorDiff = useSelector(state => state.errorInfo.difference);
  useEffect(() => {
    if (errorDiff === true) {
      console.log("error", errorDiff);
      alert("사진 4장을 골라야 해요.");
    }
    // store.dispatch(setErrorDiffInfo({ value: false }));
  }, [errorDiff]);
  return (
    <>
      <SelectList />
    </>
  );
};

export default Selection;
