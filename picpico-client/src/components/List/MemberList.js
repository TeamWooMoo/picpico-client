import { useRef } from "react";
import { useSelector } from "react-redux";

const MemberList = () => {
  const memberUL = useRef();
  const members = useSelector((state) => state.membersInfo.members);
  const memberLI = members.map((val) => <li>{val}</li>);
  return <ul ref={memberUL}>{memberLI}</ul>;
};

export default MemberList;
