import { useSelector } from "react-redux";
const VideoList = () => {
  const videos = useSelector(state => state.videosInfo.videos);
  return (
    <>
      <video id="myVideo"></video>
      <div id="peerVideos"></div>
    </>
  );
};

export default VideoList;
