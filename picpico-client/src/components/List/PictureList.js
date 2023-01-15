import { useSelector } from "react-redux";
import { useState } from "react";
const PictureList = ({ controller }) => {
  const pictures = useSelector(state => state.takepicInfo.picImg);
  const [active, setActive] = useState([]);

  const onTestClick = event => {
    const pic = event.target;
    const picId = pic.picId;

    if (active.includes(picId)) {
      pic.className = "";
      setActive(prev => prev.filter(x => x !== picId));
    } else {
      pic.className = "active_pic";
      setActive([...active, picId]);
    }
    controller.pickPic(picId);
  };

  const onPicClick = event => {
    const picLi = event.target;
    picLi.style.border = "5px solid tomato";
  };

  const pictureLI = Object.values(pictures).map((val, index) => <img alt="img" data-pic={`pic-${index}`} onClick={onPicClick} src={val}></img>);

  return (
    <ul>
      <img
        src={"https://recipe1.ezmember.co.kr/cache/recipe/2018/08/01/eeb4da99110208dc6ea8dced1142cac01.jpg"}
        data-picId={`pic-${1}`}
        alt="soysauce"
        id="soysauce"
        crossOrigin="Anonymous"
        onClick={onTestClick}
      ></img>
      {pictureLI}
    </ul>
  );
};
export default PictureList;
