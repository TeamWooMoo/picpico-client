import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { setTakePic } from "../../slice/takepicInfo";

function TakePicBtn() {
  const dispatch = useDispatch();

  const onTakePicBtnClick = () => {
    dispatch(setTakePic({ value: true }));
  };

  return (
    <>
      <IoRadioButtonOnOutline color="red" size="40" padding="5px 0" onClick={onTakePicBtnClick}></IoRadioButtonOnOutline>
    </>
  );
}
export default TakePicBtn;
