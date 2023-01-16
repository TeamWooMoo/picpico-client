import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Header, Content, Footer } from "rsuite";
import LinkModal from "../components/Modal/LinkModal";
import Decoration from "./Decoration";
import Gallery from "./Gallery";
import Selection from "./Selection";
import PicBooth from "./PicBooth";
import MainController from "../controller/MainController";
import MuteBtn from "./../components/Btn/MuteBtn";
import PicDoneBtn from "../components/Btn/PicDoneBtn";
import TakePicBtn from "./../components/Btn/TakePicBtn";
import CameraTransBtn from "./../components/Btn/CameraTransBtn";
import SelectDoneBtn from "../components/Btn/SelectDoneBtn";
import DecoDoneBtn from "../components/Btn/DecoDoneBtn";
import PicDownloadBtn from "../components/Btn/PicDownloadBtn";
import GalleryDoneBtn from "../components/Btn/GalleryDoneBtn";
import Message from "./../components/Message";
import "../style/style.css";
import "./Picpico.css";

const Picpico = () => {
  const { id } = useParams();
  const picBoothDone = useSelector(state => state.picpicoInfo.picBoothDisplay);
  const selectDone = useSelector(state => state.picpicoInfo.selectionDisplay);
  const decoDone = useSelector(state => state.picpicoInfo.decoDisplay);
  const galleryDone = useSelector(state => state.picpicoInfo.galleryDisplay);
  const controller = MainController();
  const error = useSelector(state => state.errorInfo.error);

  useEffect(() => {
    controller.init(id);
  }, []);

  useEffect(() => {
    if (error !== "") {
      alert(error);
    }
  }, [error]);

  return (
    <>
      {picBoothDone ? (
        <Container className="default_container">
          <Header className="picbooth_header">
            <LinkModal />
            <PicDoneBtn controller={controller} />
          </Header>
          <Content>
            <PicBooth controller={controller} />
          </Content>
          <Footer className="picbooth_footer">
            <MuteBtn />
            <TakePicBtn controller={controller} />
            <CameraTransBtn />
          </Footer>
        </Container>
      ) : selectDone ? (
        <Container className="default_container">
          <Header className="selection_header">
            <Message />
          </Header>
          <Content>
            <Selection controller={controller} />
          </Content>
          <Footer className="selection_footer">
            <SelectDoneBtn />
          </Footer>
        </Container>
      ) : decoDone ? (
        <Container className="default_container">
          <Header className="deco_header"></Header>
          <Content>
            <Decoration controller={controller} />
          </Content>
          <Footer className="deco_footer">
            <DecoDoneBtn />
          </Footer>
        </Container>
      ) : galleryDone ? (
        <Container className="default_container">
          <Header className="gallery_header"></Header>
          <Content>
            <Gallery />
          </Content>
          <Footer className="gallery_footer">
            <PicDownloadBtn />
            <GalleryDoneBtn />
          </Footer>
        </Container>
      ) : null}
    </>
  );
};
export default Picpico;
