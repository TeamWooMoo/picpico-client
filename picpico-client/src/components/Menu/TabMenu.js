import React from "react";
import DecoList from "../List/DecoList";
import ColorList from "../List/ColorList";

function TabMenu() {
  const clickHandler = id => {
    console.log(id);
  };
  return (
    <>
      <div className="wrapper">
        <ul className="tabs">
          <li onClick={clickHandler(0)}>
            <DecoList />
          </li>
          <li onClick={clickHandler(1)}>
            <ColorList />
          </li>
        </ul>
        <div className="contents"></div>
      </div>
    </>
  );
}
export default TabMenu;
