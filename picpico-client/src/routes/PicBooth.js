import CanvasList from "../components/List/CanvasList";
import VideoList from "../components/List/VideoList";
import { useEffect } from "react";
import store from "../store";
import { setErrorInfo } from "../slice/errorInfo";

const PicBooth = ({ controller }) => {
  useEffect(() => {
    store.dispatch(setErrorInfo(""));
    return () => {};
  }, []);
  return (
    <>
      <div>
        <CanvasList controller={controller} />
        <VideoList />
      </div>
    </>
  );
};

export default PicBooth;
