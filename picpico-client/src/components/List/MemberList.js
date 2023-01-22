import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexboxGrid } from "rsuite";
import { setMembersInfo } from "../../slice/membersInfo";

const MemberList = () => {

    const dispatch = useDispatch();
    const members = useSelector(state => state.membersInfo.members);
    const availableOptionsArr = members.map(({ nickName }, index) => nickName); // 닉네임만 있음.
    const draggingItemIndex = useRef(null);
    const draggingOverItemIndex = useRef(null);

    const onDragStart = (e, index) => {
        draggingItemIndex.current = index;
        e.target.classList.add("grabbing");
    };

    const onAvailableItemDragEnter = (e, index) => {
        draggingOverItemIndex.current = index;
        const copyListItems = [...availableOptionsArr];
        const dragItemContent = copyListItems[draggingItemIndex];
        copyListItems.splice(draggingItemIndex.current, 1);
        copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent);
        draggingItemIndex.current = draggingOverItemIndex.current;
        draggingOverItemIndex.current = null;
        // dispatch(setMembersInfo({value: }));
        // 여기에 새롭게 정의된 멤버 순서에 맞게 정렬된 멤버 닉네임 리스트
    };

    const memberKeys = Object.keys(members);


    const onDragEnd = e => {
        e.target.classList.remove("grabbing");
    };

    const onDragOver = e => {
        e.preventDefault();
    };

    const picBoothDisplay = useSelector(state => state.picpicoInfo.setPicBoothInfo);
    const memberKeys = Object.keys(members);
    const decoDisplay = useSelector(state => state.picpicoInfo.decoDisplay);

    const decos = useSelector(state => state.decoInfo.decoList);
    const decoKeys = Object.keys(decos);
    const decoColors = useSelector(state => state.decoInfo.colorList);
    const decoMapping = {};
    for (let i = 0; i < 4; i++) {
        decoMapping[decoKeys[i]] = decoColors[i];
    }

    return (
        // <div>
        //     {decoDisplay ? (
        //         <FlexboxGrid justify="center">
        //             <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
        //                 {decoKeys.map(idx => decos[idx]["viewers"].map(obj => <li style={{ float: "left", color: decoMapping[idx] }}>{obj["nickName"]}</li>))}
        //             </ul>
        //         </FlexboxGrid>
        //     ) : (
        //         <FlexboxGrid justify="center">
        //             <ul style={{ color: "black", textAlign: "center", listStyle: "none", paddingLeft: 0 }}>
        //                 {memberKeys.map(idx => (
        //                     <li style={{ float: "left" }}>{members[idx]["nickName"]}</li>
        //                 ))}
        //             </ul>
        //         </FlexboxGrid>
        //     )}
        // </div>
        <ul>
            {availableOptionsArr.map((option, index) => {
                return (
                    <li
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
    );
};

export default MemberList;
