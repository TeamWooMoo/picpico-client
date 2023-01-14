import { useSelector } from "react-redux";

const PictureList = () => {
  const pictures = useSelector((state) => state.picturesInfo.pictures);

  const onPicLiClick = (event) => {
    console.log(event);
    const picId = event.target.id;
    const picLi = document.getElementById(`${picId}`);
    picLi.style.border = "5px solid red";
  };

  const pictureLI = pictures.map((val, index) => (
    <img alt="img" id={`pic-${index}`} onClick={onPicLiClick} src={val}></img>
  ));

  return <ul>{pictureLI}</ul>;
};
export default PictureList;
