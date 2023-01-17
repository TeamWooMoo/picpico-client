import MemberList from "../components/List/MemberList";
import DecoCanvas from "../components/Canvas/DecoCanvas";
import DecoList from "../components/List/DecoList";
import ColorList from "../components/List/ColorList";

const Decoration = ({ controller }) => {
  return (
    <>
      <MemberList />
      <DecoCanvas controller={controller} />
      <div>
        <ColorList />
      </div>
      <DecoList controller={controller} />
    </>
  );
};

export default Decoration;
