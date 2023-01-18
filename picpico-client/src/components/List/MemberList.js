import { useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";

const MemberList = () => {
  const members = useSelector(state => state.membersInfo.members);
  const memberLI = members.map(val => <li>{val}</li>);

  return (
    <div>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center" }}>{memberLI}</p>
      </FlexboxGrid>
    </div>
  );
};

export default MemberList;
