import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "rsuite";
import PicDownloadBtn from "../components/Btn/PicDownloadBtn";
import GalleryDoneBtn from "../components/Btn/GalleryDoneBtn";
import { gifTest } from "../test/resultTest.mjs";
import { ResultImage, Sticker } from "../modules/resultCanvas.mjs";

const Gallery = () => {
    // 아래의 div에 들어갈 것
    // const result = useSelector(state => state.decoInfo.resultList);
    const decoData = useSelector(state => state.decoInfo.decoList);

    useEffect(() => {
        const resultImages = [];
        const idxArr = Object.keys(decoData);
        // 꾸민 사진 4개에 대해 각각 실행
        idxArr.forEach(idx => {
            const canvas = document.getElementById(`img-${idx}`); // canvas #img : 사진
            const peer = document.getElementById(`peer-${idx}`); // canvas #peer : peer drawing
            const my = document.getElementById(`my-${idx}`); // canvas #my : my drawing

            const ctx = canvas.getContext("2d");
            ctx.drawImage(peer, 0, 0);
            ctx.drawImage(my, 0, 0);

            const curImage = new ResultImage(canvas.toDataURL(), []);
            // 스티커 넣어줘야함
            const curImageStickerField = document.getElementById(`sticker-${idx}`);
            const stickers = curImageStickerField.children; // div

            // for문 돌면서
            for (let i = 0; i < stickers.length; i++) {
                const url = stickers[i].children[0].src; // div > img
                let axisX = parseInt(stickers[i].style.top.split("px")[0]);
                let axisY = parseInt(stickers[i].style.left.split("px")[0]);

                //! axisX, axisY NaN 체크 필요함!!!!!!!

                axisX = isNaN(axisX) ? 0 : axisX;
                axisY = isNaN(axisY) ? 0 : axisY;

                console.log("axisX >> ", axisX);
                console.log("axisY >> ", axisY);

                const curSticker = new Sticker(url, axisX, axisY);
                curImage.stickers.push(curSticker);
            }
            resultImages.push(curImage);
        });

        gifTest(resultImages);
    }, []);
    return (
        <Container>
            <PicDownloadBtn />
        </Container>
    );
};

export default Gallery;
