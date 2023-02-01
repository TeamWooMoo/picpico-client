import { useDispatch } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import next_btn from "./../../assets/images/icon-next.png";

const GalleryDoneBtn = () => {
    const dispatch = useDispatch();

    function onGalleryDoneBtnClick() {
        socket.emit("next_step", "gallery", socket.id);
        // dispatch(setGalleryInfo({ value: false }));
        // dispatch(setPicBoothInfo({ value: true }));

        window.location.href = "/";
    }
    return <img src={next_btn} className="btn-shadow" style={{ width: "40px", height: "40px" }} onClick={onGalleryDoneBtnClick} />;
};

export default GalleryDoneBtn;
