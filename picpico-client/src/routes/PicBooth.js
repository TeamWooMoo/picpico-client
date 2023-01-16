import CanvasList from "../components/List/CanvasList";
import VideoList from "../components/List/VideoList";
import { useEffect } from "react";

const PicBooth = ({ controller }) => {
  useEffect(() => {
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
