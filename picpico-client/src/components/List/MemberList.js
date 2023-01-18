import { useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";

const MemberList = () => {
  const members = useSelector(state => state.membersInfo.members);
  const memberKeys = Object.keys(members);

  return (
    <div>
      <FlexboxGrid justify="center">
        <ul style={{ color: "black", textAlign: "center", listStyle: "none" }}>
          {memberKeys.map(idx => (
            <li style={{ float: "left" }}>{members[idx]["nickName"]}</li>
          ))}
        </ul>
      </FlexboxGrid>
    </div>
  );
};

export default MemberList;
