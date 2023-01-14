import MemberList from "../components/List/MemberList";
import PictureList from "../components/List/PictureList";
import ColorList from "../components/List/ColorList";
import DecoDoneBtn from "../components/Btn/DecoDoneBtn";
import MainCanvas from "../components/Canvas/MainCanvas";

const Decoration = ({ controller }) => {
  return (
    <>
      <MemberList />
      <MainCanvas />
      <PictureList />
      <ColorList />
      <DecoDoneBtn />
    </>
  );
};

export default Decoration;
