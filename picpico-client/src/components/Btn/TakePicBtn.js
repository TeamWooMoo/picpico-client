import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { setTakePic } from "../../slice/takepicInfo";

function TakePicBtn() {
  const dispatch = useDispatch();
  // const [count, setCount] = useState(0);
  // const picImgArr = useSelector(state => state.takepicInfo.picImg);

  const onTakePicBtnClick = () => {
    // setCount(prev => prev + 1);
    dispatch(setTakePic({ value: true }));
    // controller.takePic(count.toString(), picImgArr[picImgArr.length - 1]);
  };

  // useEffect(() => {
  //   // if (picImgArr.length > 0) {
  //     // controller.takePic(picImgArr[picImgArr.length - 1]);
  //     dispatch(setTakePic({ value: false }));
  //   }
  // }, [picImgArr]);

  return (
    <>
      <IoRadioButtonOnOutline color="red" size="40" padding="5px 0" onClick={onTakePicBtnClick}></IoRadioButtonOnOutline>
    </>
  );
}
export default TakePicBtn;
