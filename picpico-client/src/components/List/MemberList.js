import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../modules/sockets.mjs";

const MemberList = () => {
    const dispatch = useDispatch();
    const members = useSelector(state => state.membersInfo.members);
    const availableOptionsArr = members.map(({ nickName }, index) => nickName); // 닉네임만 있음.
    const [draggingItemIndex, setDraggingItemIndex] = useState(0);
    const [draggingOverItemIndex, setDraggingOverItemIndex] = useState(null);

    const onDragStart = (e, index) => {
        console.log("START e.target", e.target.key);
        setDraggingItemIndex(e.target.key);
        e.target.classList.add("grabbing");
    };

    const onAvailableItemDragEnter = (e, index) => {
        const oldIndex = draggingItemIndex;
        setDraggingOverItemIndex(index);
        const copyListItems = [...availableOptionsArr];
        const dragItemContent = copyListItems[draggingItemIndex];
        copyListItems.splice(draggingItemIndex, 1);
        copyListItems.splice(draggingOverItemIndex, 0, dragItemContent);
        setDraggingItemIndex(draggingOverItemIndex);
        setDraggingOverItemIndex(null);
        // dispatch(setMembersInfo({value: }));
        // 여기에 새롭게 정의된 멤버 순서에 맞게 정렬된 멤버 닉네임 리스트
        console.log("old index, new index", oldIndex, index);
        socket.emit("reset_member", oldIndex, index);
        console.log("[reset-member] client emit");
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
        /*
        <div>
            {decoDisplay ? (
                <FlexboxGrid justify="center">
                    <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                        {decoKeys.map(idx => decos[idx]["viewers"].map(obj => <li style={{ float: "left", color: decoMapping[idx] }}>{obj["nickName"]}</li>))}
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
        </div>*/
        <div>
            {picBoothDisplay ? (
                <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                    {availableOptionsArr.map((option, index) => {
                        return (
                            <li
                                style={{ float: "left", color: decoMapping[index] }}
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
                <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
                    {memberKeys.map(idx => (
                        <li style={{ float: "left" }}>{members[idx]["nickName"]}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MemberList;
