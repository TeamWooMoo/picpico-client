import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "rsuite";
import PicDownloadBtn from "../components/Btn/PicDownloadBtn";
import GalleryDoneBtn from "../components/Btn/GalleryDoneBtn";
import { gifTest } from "../test/resultTest.mjs";

const Gallery = () => {
    // 아래의 div에 들어갈 것
    const result = useSelector(state => state.decoInfo.resultList);

    useEffect(() => {
        gifTest(result);
    }, [result]);
    return (
        <Container>
            <PicDownloadBtn />
        </Container>
    );
};

export default Gallery;
