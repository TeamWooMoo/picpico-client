import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "rsuite";
import { setTakePic } from "../../slice/takepicInfo";

function TakePicBtn() {
  const dispatch = useDispatch();
  // const [count, setCount] = useState(0);
  // const picImgArr = useSelector(state => state.takepicInfo.picImg);

  const onTakePicBtnClick = () => {
    // setCount(prev => prev + 1);
    dispatch(setTakePic({ value: true }));
  };

  // useEffect(() => {
  //   // if (picImgArr.length > 0) {
  //     dispatch(setTakePic({ value: false }));
  //   }
  // }, [picImgArr]);

  return (
    <>
      <Button block size="sm" color="violet" appearance="primary" className="violet_btn" onClick={onTakePicBtnClick}>
        사진 찍는 버튼
      </Button>
    </>
  );
}
export default TakePicBtn;
