import { useSelector } from "react-redux";
import { useState } from "react";
import { socket } from "../../modules/sockets.mjs";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const SelectList = ({ controller }) => {
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
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
      title: "Bed",
    },
    {
      img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
      title: "Books",
    },
    {
      img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
      title: "Sink",
    },
  ];
  return (
    <>
      <ImageList sx={{ width: 200, height: 200 }} cols={3} rowHeight={164}>
        {itemData.map(item => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
export default SelectList;
