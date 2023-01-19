import { useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";

const MemberList = () => {
  const members = useSelector(state => state.membersInfo.members);
  const memberKeys = Object.keys(members);

  const decoDisplay = useSelector(state => state.picpicoInfo.decoDisplay);

  const decos = useSelector(state => state.decoInfo.decoList);
  const decoKeys = Object.keys(decos);
  console.log("decoKeys", decoKeys);
  const decoColors = useSelector(state => state.decoInfo.colorList);
  const decoMapping = {};
  for (let i = 0; i < 4; i++) {
    decoMapping[decoKeys[i]] = decoColors[i];
  }

  return (
    <div>
      {decoDisplay ? (
        <FlexboxGrid justify="center">
          <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
            {decoKeys.map(idx =>
              decos[idx]["viewers"].map(viewer => <li style={{ float: "left", color: decoMapping[idx] }}>{decos[idx]["viewers"][viewer]}</li>)
            )}
          </ul>
        </FlexboxGrid>
      ) : (
        <FlexboxGrid justify="center">
          <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
            {memberKeys.map(idx => (
              <li style={{ float: "left" }}>{members[idx]["nickName"]}</li>
            ))}
          </ul>
        </FlexboxGrid>
      )}
    </div>
  );
};

export default MemberList;
