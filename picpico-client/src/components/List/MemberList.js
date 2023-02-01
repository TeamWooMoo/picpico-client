import { useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";
import { polyfill } from "mobile-drag-drop";
import "./MemberList.css";

const MemberList = () => {
    const isPicBooth = useSelector(state => state.picpicoInfo.picBoothDisplay);
    if (isPicBooth) polyfill();

    const members = useSelector(state => state.membersInfo.members);
    const memberNameArr = members.map(member => {
        return member["nickName"];
    });

    const draggingNameIndex = useRef(0);
    const draggingOverNameIndex = useRef(null);

    const onMemberListDragStart = e => {
        draggingNameIndex.current = e.target.id;
        e.target.classList.add("grabbing");
    };

    const onMemberListDragEnter = index => {
        const oldIndex = draggingNameIndex.current;
        draggingOverNameIndex.current = index;
        const copyNameArr = [...memberNameArr];
        const dragItemContent = copyNameArr[draggingNameIndex.current];
        copyNameArr.splice(draggingNameIndex.current, 1);
        copyNameArr.splice(draggingOverNameIndex.current, 0, dragItemContent);
        draggingNameIndex.current = draggingOverNameIndex.current;
        socket.emit("change_layer", oldIndex, index);
        draggingOverNameIndex.current = null;
    };

    const onMemberListDragEnd = e => {
        e.target.classList.remove("grabbing");
    };

    const onMemberListDragOver = e => {
        e.preventDefault();
    };

    const picBoothDisplay = useSelector(state => state.picpicoInfo.picBoothDisplay);
    const decoDisplay = useSelector(state => state.picpicoInfo.decoDisplay);

    const decoObj = useSelector(state => state.decoInfo.decoList);
    const decoKeys = Object.keys(decoObj);
    const decoColors = useSelector(state => state.decoInfo.colorList);
    const decoMapping = {};
    for (let i = 0; i < 4; i++) {
        decoMapping[decoKeys[i]] = decoColors[i];
    }
    return (
        <div>
            {decoDisplay ? (
                <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                    {decoKeys.map(idx =>
                        decoObj[idx]["viewers"].map(obj => (
                            <li className="memName" style={{ color: decoMapping[idx] }}>
                                {obj["nickName"]}
                            </li>
                        ))
                    )}
                </ul>
            ) : (
                <ul style={{ color: "white", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                    {memberNameArr.map((option, index) => (
                        <li
                            className="memName"
                            id={index}
                            onDragStart={e => onMemberListDragStart(e)}
                            onDragEnter={e => onMemberListDragEnter(index)}
                            onDragOver={onMemberListDragOver}
                            onDragEnd={onMemberListDragEnd}
                            draggable
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MemberList;
