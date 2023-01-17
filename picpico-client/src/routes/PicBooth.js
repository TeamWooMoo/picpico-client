import CanvasList from "../components/List/CanvasList";
import VideoList from "../components/List/VideoList";
import { useEffect } from "react";
import store from "../store";
import { setErrorInfo } from "../slice/errorInfo";

const PicBooth = () => {
  // useEffect(() => {
  //   store.dispatch(setErrorInfo(""));
  //   return () => {};
  // }, []);
  return (
    <>
      <div>
        <CanvasList />
        <VideoList />
      </div>
    </>
  );
};

export default PicBooth;
