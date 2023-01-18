import { useState } from "react";
import styled from "styled-components";
import ColorList from "../List/ColorList";
import StickerList from "../List/StickerList";

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

const TabMenu = styled.div`
  // background-color: #dcdcdc;
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  text-align:
  justify-items: center;
  justify-content: center;
  align-items: center;
  list-style: none;
  cursor: pointer;
  margin: 5px;

  .submenu {
    ${"" /* 기본 Tabmenu 에 대한 CSS를 구현합니다. */}
    display: flex;
    text-align: center;
    justify-content: space-between;
    // width: 100px;
    height: 30px;
    padding: 10px;
    font-size: 15px;
  }

  .focused {
    ${"" /* 선택된 Tabmenu 에만 적용되는 CSS를 구현합니다.  */}
    color: black;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
  aligin-items: center;
`;

const TabBar = () => {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: "Color", content: <ColorList /> },
    { name: "Sticker", content: <StickerList /> },
  ];

  const selectMenuHandler = index => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  return (
    <>
      <div>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li className={index === currentTab ? "submenu focused" : "submenu"} onClick={() => selectMenuHandler(index)}>
              {el.name}
            </li>
          ))}
        </TabMenu>
        <Desc>
          <p>{menuArr[currentTab].content}</p>
        </Desc>
      </div>
    </>
  );
};

export default TabBar;