import { useSelector } from "react-redux";
import { useState } from "react";
import { socket } from "../../modules/sockets.mjs";
const PictureList = ({ controller }) => {
  const [active, setActive] = useState([]);
  const roomId = useSelector(state => state.roomInfo.room);

  const onTestClick = event => {
    const pic = event.target;
    const picId = event.target.dataset.picid;
    console.log(picId);

    if (active.includes(picId)) {
      pic.className = "";
      setActive(prev => prev.filter(x => x !== picId));
    } else {
      pic.className = "active_pic";
      setActive([...active, picId]);
    }
    // controller.pickPic(roomId, picId);
    socket.emit("pick_pic", roomId, picId);
  };

  // const onPicClick = event => {
  //   const picLi = event.target;
  //   picLi.style.border = "5px solid tomato";
  // };

  // const pictureLI = Object.values(pictures).map((val, index) => <img alt="img" data-pic={`pic-${index}`} onClick={onPicClick} src={val}></img>);

  // useEffect(() => {
  //   //방장이 누른 이미지 활성화
  // }, [selected]);

  return (
    <ul>
      <img
        src={"https://recipe1.ezmember.co.kr/cache/recipe/2018/08/01/eeb4da99110208dc6ea8dced1142cac01.jpg"}
        data-picid={`pic${active?.length}`}
        alt="soysauce"
        id="soysauce"
        crossOrigin="Anonymous"
        onClick={onTestClick}
      ></img>
      {/* {pictureLI} */}
    </ul>
  );
};
export default PictureList;
