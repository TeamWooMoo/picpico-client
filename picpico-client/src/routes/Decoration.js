import MemberList from "../components/List/MemberList";
import PictureList from "../components/List/PictureList";
import ColorList from "../components/List/ColorList";
import DecoDoneBtn from "../components/Btn/DecoDoneBtn";

const Decoration = ({ controller }) => {
  return (
    <>
      <MemberList />
      <canvas></canvas>
      <PictureList />
      <ColorList />
      <DecoDoneBtn />
    </>
  );
};

export default Decoration;
