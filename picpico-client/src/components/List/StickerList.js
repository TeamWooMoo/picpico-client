import { useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";
import narin from "../../assets/gif/narin.gif";
import dabom from "../../assets/gif/dabom.gif";

const StickerList = () => {
  const onStickerClick = () => {
    console.log("스티커 클릭");
  };
  return (
    <>
      <FlexboxGrid justify="center" className="color-options">
        <div style={{ height: "40px" }}></div>
        <div id="drag-items">
          <img style={{ height: "40px" }} src={narin} draggable="true" />
          <img style={{ height: "40px" }} src={dabom} draggable="true" />
        </div>
      </FlexboxGrid>
    </>
  );
};

export default StickerList;
