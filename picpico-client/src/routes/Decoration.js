import MemberList from "../components/List/MemberList";
import PictureList from "../components/List/PictureList";
import ColorList from "../components/List/ColorList";
import DecoDoneBtn from "../components/Btn/DecoDoneBtn";
import DecoCanvas from "../components/Canvas/DecoCanvas";

const Decoration = () => {
  return (
    <>
      <MemberList />
      <DecoCanvas />
      <PictureList />
      <ColorList />
      <DecoDoneBtn />
    </>
  );
};

export default Decoration;
