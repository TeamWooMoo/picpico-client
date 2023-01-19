import { useSelector } from "react-redux";
import { Container } from "rsuite";
import PicDownloadBtn from "../components/Btn/PicDownloadBtn";

const Gallery = () => {
  // 아래의 div에 들어갈 것
  const realResultList = useSelector(state => state.decoInfo.realResultList);

  return (
    <Container>
      <div></div>
      <PicDownloadBtn />
    </Container>
  );
};

export default Gallery;
