import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'rsuite';
import { setTakePic } from '../../slice/takepicInfo';

function TakePicBtn({ controller }) {
  const dispatch = useDispatch();
  const picImgArr = useSelector(state => state.takepicInfo.picImg);

  const onTakePicBtnClick = () => {
    console.log(picImgArr);
    dispatch(setTakePic({ value: true }));
  };

  useEffect(() => {
    if (picImgArr.length > 0) {
      controller.takePic(picImgArr[picImgArr.length - 1]);
      dispatch(setTakePic({ value: false }));
    }
  }, [picImgArr]);

  return (
    <>
      <Button block size="sm" color="violet" appearance="primary" className="violet_btn" onClick={onTakePicBtnClick}>
        사진 찍는 버튼
      </Button>
    </>
  );
}
export default TakePicBtn;
