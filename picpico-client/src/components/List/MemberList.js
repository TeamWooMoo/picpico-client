import { useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";

const MemberList = () => {
  const members = useSelector(state => state.membersInfo.members);
  const memberKeys = Object.keys(members);
  console.log("memberksys:", memberKeys);

  return (
    <div>
      <FlexboxGrid justify="center">
        <p style={{ color: "black", textAlign: "center" }}>
          {memberKeys.map(idx => (
            <li>{members[idx]["nickName"]}</li>
          ))}
        </p>
      </FlexboxGrid>
    </div>
  );
};

export default MemberList;
