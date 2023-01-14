import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'rsuite';
import Decoration from './Decoration';
import Gallery from './Gallery';
import Selection from './Selection';
import PicBooth from './PicBooth';
import MainController from '../controller/MainController';
const Picpico = () => {
  // const controller = WebrtcController();
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
