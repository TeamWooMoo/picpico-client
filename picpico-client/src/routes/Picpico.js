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
import "../style/style.css";

const Picpico = () => {
  const { id } = useParams();
  const picBoothDone = useSelector(state => state.picpicoInfo.picBoothDisplay);
  const selectDone = useSelector(state => state.picpicoInfo.selectionDisplay);
  const decoDone = useSelector(state => state.picpicoInfo.decoDisplay);
  const galleryDone = useSelector(state => state.picpicoInfo.galleryDisplay);
  const controller = MainController();

  useEffect(() => {
    controller.init(id);
  }, []);

  return (
    <>
      {picBoothDone ? (
        <Container className="default_container">
          <Header className="picBoothDone_Header">
            {/* <p>이번 방은 {id}번 방 입니다.</p> */}
            <LinkModal />
          </Header>
          <Content>
            <PicBooth controller={controller} />
          </Content>
          <Footer>Footer</Footer>
        </Container>
      ) : selectDone ? (
        <Container className="default_container">
          <Selection controller={controller} />
        </Container>
      ) : decoDone ? (
        <Container className="default_container">
          <Decoration controller={controller} />
        </Container>
      ) : galleryDone ? (
        <Container className="default_container">
          <Gallery />
        </Container>
      ) : null}
    </>
  );
};
export default Picpico;
