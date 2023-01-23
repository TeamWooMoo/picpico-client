import { useDispatch } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { setIdxCount, setTakePic } from "../../slice/takepicInfo";

function TakePicBtn() {
    const dispatch = useDispatch();

    const onTakePicBtnClick = () => {
        console.log("사진 찍히니 ~");
        console.log("너네 지금 찍히냐 ?????????????");
        dispatch(setTakePic({ value: true }));
    };

    return (
        <>
            <Button className="btn-shadow" color="red" size="40px" padding="5px 0" onClick={onTakePicBtnClick}></Button>
        </>
    );
}
export default TakePicBtn;
