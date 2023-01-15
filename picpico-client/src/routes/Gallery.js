import { Container } from "rsuite";
import PicDownloadBtn from "../components/Btn/PicDownloadBtn";
import GalleryDoneBtn from "../components/Btn/GalleryDoneBtn";

const Gallery = () => {
  return (
    <Container>
      {/* <ImageWrap ref={imgResult}>
          <ImageSelected src={images[imageIndex]} alt="background" />
          <Message>{message}</Message>
          <Bible>{bible}</Bible>
        </ImageWrap> */}
      <PicDownloadBtn />
      <GalleryDoneBtn />
    </Container>
  );
};

export default Gallery;
