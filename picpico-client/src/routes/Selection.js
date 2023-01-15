import PictureList from "../components/List/PictureList";
import SelectDoneBtn from "../components/Btn/SelectDoneBtn";

const Selection = ({ controller }) => {
  return (
    <>
      <PictureList controller={controller} />
      <SelectDoneBtn />
    </>
  );
};

export default Selection;
