import { useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";

const MemberList = () => {
  const members = useSelector(state => state.membersInfo.members);
  const memberLI = members.map(val => <li>{val}</li>);

  return (
    <>
      <FlexboxGrid justify="center">{memberLI}</FlexboxGrid>
    </>
  );
};

export default MemberList;
