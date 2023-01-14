import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import WebrtcController from "../controller/WebrtcController";
import { Container } from "rsuite";
import Decoration from "./Decoration";
import Gallery from "./Gallery";
import Selection from "./Selection";
import PicBooth from "./PicBooth";

const Picpico = () => {
  const controller = WebrtcController();
  const { id } = useParams();
  const picBoothDone = useSelector(
    (state) => state.picpicoInfo.picBoothDisplay
  );
  const selectDone = useSelector((state) => state.picpicoInfo.selectionDisplay);
  const decoDone = useSelector((state) => state.picpicoInfo.decoDisplay);
  const galleryDone = useSelector((state) => state.picpicoInfo.galleryDisplay);

  useEffect(() => {
    controller.init(id);
  }, []);

  return (
    <>
      {picBoothDone ? (
        <Container>
          <PicBooth controller={controller} />
        </Container>
      ) : null}
      {selectDone ? (
        <Container>
          <Selection controller={controller} />
        </Container>
      ) : null}
      {decoDone ? (
        <Container>
          <Decoration controller={controller} />
        </Container>
      ) : null}
      {galleryDone ? (
        <Container>
          <Gallery />
        </Container>
      ) : null}
    </>
  );
};
export default Picpico;
