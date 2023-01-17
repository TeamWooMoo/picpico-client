import { useSelector } from "react-redux";
import "./DecoList.css";

const DecoList = () => {
  const decoImgList = useSelector(state => state.drawingInfo.decoList);
  return <ul></ul>;
};

export default DecoList;
