// import "./PicBooth.css";
import MuteBtn from "./../components/Btn/MuteBtn";
import CameraBtn from "./../components/Btn/CameraBtn";
import TakePicBtn from "./../components/Btn/TakePicBtn";
import PicDoneBtn from "../components/Btn/PicDoneBtn";
import CanvasList from "../components/List/CanvasList";
import VideoList from "../components/List/VideoList";
import { ButtonGroup } from "rsuite";

const PicBooth = ({ controller }) => {
  return (
    <>
      <div>
        <CanvasList />
        <VideoList />
      </div>

      <div>
        <ButtonGroup style={{ display: "flex" }}>
          <MuteBtn />
          <CameraBtn />
          <TakePicBtn controller={controller} />
          <PicDoneBtn controller={controller} />
        </ButtonGroup>
      </div>
    </>
  );
};

export default PicBooth;
