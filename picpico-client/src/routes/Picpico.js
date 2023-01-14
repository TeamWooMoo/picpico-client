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
  const { id } = useParams();
  const picBoothDone = useSelector(state => state.picpicoInfo.picBoothDisplay);
  const selectDone = useSelector(state => state.picpicoInfo.selectionDisplay);
  const decoDone = useSelector(state => state.picpicoInfo.decoDisplay);
  const galleryDone = useSelector(state => state.picpicoInfo.galleryDisplay);

  useEffect(() => {
    const mainController = MainController();
    mainController.init(id);
  }, []);

  return (
    <>
      {picBoothDone ? (
        <Container>
          <PicBooth />
        </Container>
      ) : null}
      {selectDone ? (
        <Container>
          <Selection />
        </Container>
      ) : null}
      {decoDone ? (
        <Container>
          <Decoration />
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
