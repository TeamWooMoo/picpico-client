import { useSelector } from "react-redux";

const MemberList = () => {
  const members = useSelector((state) => state.membersInfo.members);
  const memberLI = members.map((val) => <li>{val}</li>);
  return <ul r>{memberLI}</ul>;
};

export default MemberList;
