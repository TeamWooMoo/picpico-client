import { useSelector } from "react-redux";
import { useState } from "react";
const PictureList = () => {
  const pictures = useSelector(state => state.takepicInfo.picImg);
  const [picked, setPicked] = useState([]);

  const onTestClick = event => {
    const pic = event.target;
    const idx = pic.dataset.pic;
    if (!picked.includes(idx)) {
      setPicked(prev => [...prev, idx]);
      picked.push(idx);
      pic.style.border = "5px solid white";
    } else if (picked && picked.includes(idx)) {
      pic.style.border = "";
      setPicked(prev => prev.filter(x => x !== idx));
    }
  };

  const onPicClick = event => {
    console.log(event, event.target);
    const picId = event.target.id;
    const picLi = document.getElementById(`${picId}`);
    picLi.style.border = "5px solid tomato";
  };

  const pictureLI = Object.values(pictures).map((val, index) => <img alt="img" data-pic={`pic-${index}`} onClick={onPicClick} src={val}></img>);

  return (
    <ul>
      {/* <img
        src={
          "https://recipe1.ezmember.co.kr/cache/recipe/2018/08/01/eeb4da99110208dc6ea8dced1142cac01.jpg"
        }
        data-pic={`pic-${1}`}
        alt="soysauce"
        id="soysauce"
        crossOrigin="Anonymous"
        onClick={onTestClick}
      ></img> */}
      {pictureLI}
    </ul>
  );
};
export default PictureList;
