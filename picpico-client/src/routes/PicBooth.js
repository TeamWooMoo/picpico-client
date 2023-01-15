// import "./PicBooth.css";
import { useParams } from "react-router-dom";
import MuteBtn from "./../components/Btn/MuteBtn";
import CameraBtn from "./../components/Btn/CameraBtn";
import TakePicBtn from "./../components/Btn/TakePicBtn";
import PicDoneBtn from "../components/Btn/PicDoneBtn";
import LinkModal from "../components/Modal/LinkModal";
import { Header } from "rsuite";
import CanvasList from "../components/List/CanvasList";
import VideoList from "../components/List/VideoList";

const PicBooth = ({ controller }) => {
  const { id } = useParams();
  return (
    <>
      <Header>
        <p>이번 방은 {id}번 방 입니다.</p>
        <LinkModal />
      </Header>

      <div>
        <CanvasList controller={controller} />
        <VideoList />
      </div>

      <div>
        <MuteBtn />
        <CameraBtn />
        <TakePicBtn controller={controller} />
        <PicDoneBtn controller={controller} />
      </div>
    </>
  );
};

export default PicBooth;
