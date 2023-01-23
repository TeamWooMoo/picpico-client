import { useSelector } from "react-redux";

const TakePicCountMessage = () => {
    const idx = useSelector(state => state.takepicInfo.idx);

    return (
        <>
            <div style={{ color: "white" }} className="drop-shadow" size="30px" padding="5px 0">
                <h3 style={{ fontWeight: "bold" }}>{idx}</h3>
            </div>
        </>
    );
};

export default TakePicCountMessage;
