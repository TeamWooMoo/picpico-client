import { useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";
const StickerList = () => {
  const onStickerClick = () => {
    console.log("스티커 클릭");
  };
  return (
    <>
      <FlexboxGrid justify="center" className="color-options">
        <div style={{ height: "30px" }}></div>
      </FlexboxGrid>
    </>
  );
};

export default StickerList;
