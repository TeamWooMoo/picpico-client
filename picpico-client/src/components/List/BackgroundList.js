import { FlexboxGrid } from "rsuite";
import star from "./../../assets/images/background-star.png";
import water from "./../../assets/images/background-water.png";
import none from "./../../assets/images/background-none.png";

const StickerList = () => {
    return (
        <>
            <FlexboxGrid justify="center" className="color-options">
                <div style={{ height: "40px" }}></div>
                <div id="">
                    <img style={{ height: "40px", margin: "0 5px", borderRadius: "7px" }} src={none} draggable="true" />
                    <img style={{ height: "40px", margin: "0 5px", borderRadius: "7px" }} src={star} draggable="true" />
                    <img style={{ height: "40px", margin: "0 5px", borderRadius: "7px" }} src={water} draggable="true" />
                </div>
            </FlexboxGrid>
        </>
    );
};

export default StickerList;
