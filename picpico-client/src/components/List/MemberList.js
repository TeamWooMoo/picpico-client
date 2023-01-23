import { useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";

const MemberList = () => {
    const members = useSelector(state => state.membersInfo.members);
    console.log("members:", members);
    const availableOptionsArr = members.map((index, { nickName }) => nickName); // 닉네임만 있음.
    console.log("availableOptionsArr", availableOptionsArr);
    const draggingItemIndex = useRef(0);
    const draggingOverItemIndex = useRef(null);

    const onDragStart = (e, index) => {
        console.log("START e.target", e.target.key);
        draggingItemIndex.current = e.target.key;
        e.target.classList.add("grabbing");
    };

    const onAvailableItemDragEnter = (e, index) => {
        const oldIndex = draggingItemIndex.current;
        // setDraggingOverItemIndex(index);
        draggingOverItemIndex.current = index;
        const copyListItems = [...availableOptionsArr];
        const dragItemContent = copyListItems[draggingItemIndex.current];
        copyListItems.splice(draggingItemIndex.current, 1);
        copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent);
        draggingItemIndex.current = draggingOverItemIndex.current;
        console.log("old index, new index", oldIndex, index);
        socket.emit("change_layer", oldIndex, index);
        draggingOverItemIndex.current = null;
        console.log("[change-layer] client emit");
    };

    const onDragEnd = e => {
        console.log("END e.target", e.target);
        e.target.classList.remove("grabbing");
    };

    const onDragOver = e => {
        e.preventDefault();
    };

    const memberKeys = Object.keys(members);
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
            {picBoothDisplay ? (
                <ul style={{ color: "violet", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                    {availableOptionsArr.map((option, index) => {
                        return (
                            <li
                                style={{ float: "left" }}
                                key={index}
                                onDragStart={e => onDragStart(e, index)}
                                onDragEnter={e => onAvailableItemDragEnter(e, index)}
                                onDragOver={onDragOver}
                                onDragEnd={onDragEnd}
                                draggable
                            >
                                {option}
                            </li>
                        );
                    })}
                </ul>
            ) : decoDisplay ? (
                <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                    {decoKeys.map(idx => decoObj[idx]["viewers"].map(obj => <li style={{ float: "left", color: decoMapping[idx] }}>{obj["nickName"]}</li>))}
                </ul>
            ) : (
                <ul style={{ color: "green", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                    {memberKeys.map(idx => (
                        <li style={{ float: "left" }}>{members[idx]["nickName"]}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MemberList;
