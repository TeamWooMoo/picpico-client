import {useSelector} from "react-redux";
import {FlexboxGrid} from "rsuite";
import narin from "../../assets/gif/narin.gif";
import dabom from "../../assets/gif/dabom.gif";
import nr0 from "../../assets/images/nr0.png";
import nr10 from "../../assets/images/nr10.png";
import jh1 from "../../assets/images/jh1.png";
import sticker1 from "../../assets/gif/sticker1.gif";
import sticker2 from "../../assets/gif/sticker2.gif";
import sticker3 from "../../assets/gif/sticker3.gif";
import {parseGIF, decompressFrames} from "gifuct-js";
import {makeGIF} from "../../modules/resultGIF.mjs";
import {socket} from "../../modules/sockets.mjs";

const StickerList = () => {
    const targetImgIdx = useSelector(state => state.decoInfo.myDecoCanvas);
    const onStickerClick = url => {
        console.log("스티커 클릭");
        socket.emit("pick_sticker", url, targetImgIdx);
        // server에게 putsticker 이벤트보냄
        // server에서는 방의 모두에게 putsticker 이벤트와 스티커 정보 보냄
        // 방의 모두는 putsticker 이벤트와 스티커 정보가 들어오면 그 스티커를 캔버스에 생성함
        // const promisedGif = narin;

        // console.log("narin", narin);
        // const promisedGif = fetch(url)
        //     .then(resp => resp.arrayBuffer())
        //     .then(buff => {
        //         const gif = parseGIF(buff);
        //         const frames = decompressFrames(gif, true);

        //         console.log("frames", frames);
        //         const imageData = new ImageData(frames[0].patch, frames[0].dims.width, frames[0].dims.height);

        //         const testCanvas = document.createElement("canvas");
        //         const testctx = testCanvas.getContext("2d");
        //         const row = document.getElementById("drag-items");

        //         row.appendChild(testCanvas);

        //         testctx.putImageData(imageData, 0, 0);
        //         // frames 조작
        //         // frames[index]
        //     });
    };

    const onNarinClick = () => {
        // makeGIF();
    };

    return (
        <>
            <FlexboxGrid justify="center" className="color-options">
                <div style={{height: "40px"}}></div>
                <div id="drag-items">
                    {/* 
                      <div class="draggable" style={{ position: "absolute", width: "100px", height: "100px" }}>
                        <img
                          alt="sticker2"
                          src="https://storage.cobak.co/uploads/1585038492476558_8eeec6050c.gif"
                          // class="draggable"
                          style={{ position: "absolute", width: "100px", height: "100px" }}
                        />
                      </div> 
                    */}
                    {/* <img style={{ height: "40px" }} onClick={() => onStickerClick(narin)} src={narin} draggable="true" /> */}

                    <img style={{height: "40px"}} onClick={() => onStickerClick(sticker1)} src={sticker1} draggable="true" />
                    <img style={{height: "40px"}} onClick={() => onStickerClick(sticker2)} src={sticker2} draggable="true" />
                    <img style={{height: "40px"}} onClick={() => onStickerClick(sticker3)} src={sticker3} draggable="true" />

                    {/* <img style={{height: "40px"}} src={nr0} onClick={onNarinClick} />
                    <img style={{height: "40px"}} src={jh1} />
                    <img style={{height: "40px"}} src={nr10} /> */}
                </div>
            </FlexboxGrid>
        </>
    );
};

export default StickerList;
