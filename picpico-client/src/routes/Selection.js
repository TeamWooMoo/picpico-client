import PictureList from "../components/List/PictureList";
import SelectDoneBtn from "../components/Btn/SelectDoneBtn";

const Selection = ({ controller }) => {
  return (
    <>
      <PictureList controller={controller} />
      <SelectDoneBtn controller={controller} />
    </>
  );
};

export default Selection;
