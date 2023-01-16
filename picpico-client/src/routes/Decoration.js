import MemberList from "../components/List/MemberList";
import PictureList from "../components/List/PictureList";
import ColorList from "../components/List/ColorList";
import DecoCanvas from "../components/Canvas/DecoCanvas";

const Decoration = ({ controller }) => {
  return (
    <>
      <MemberList />
      <DecoCanvas controller={controller} />
      <PictureList controller={controller} />
      <ColorList />
    </>
  );
};

export default Decoration;
