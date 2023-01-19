import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "rsuite";
import PicDownloadBtn from "../components/Btn/PicDownloadBtn";
import { gifTest } from "../test/resultTest.mjs";

const Gallery = () => {
  // 아래의 div에 들어갈 것
  const realResult = useSelector(state => state.decoInfo.realResultList);

  useEffect(() => {
    gifTest(realResult);
  }, []);
  return (
    <Container>
      <div></div>
      <PicDownloadBtn />
    </Container>
  );
};

export default Gallery;
