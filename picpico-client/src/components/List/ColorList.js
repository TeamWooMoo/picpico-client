import React from "react";
import { setStrokeColorInfo } from "../../slice/drawingInfo";
import store from "../../store";
import "./ColorList.css";

const ColorList = () => {
  const onColorClick = event => {
    const color = event.target.dataset.color;
    store.dispatch(setStrokeColorInfo({ value: color }));
  };
  return (
    <>
      <div className="color-options">
        <div onClick={onColorClick} className="color-option" style={{ backgroundColor: "#ee4035" }} data-color="#ee4035"></div>
        <div onClick={onColorClick} className="color-option" style={{ backgroundColor: "#f37736" }} data-color="#f37736"></div>
        <div onClick={onColorClick} className="color-option" style={{ backgroundColor: "#fdf498" }} data-color="#fdf498"></div>
        <div onClick={onColorClick} className="color-option" style={{ backgroundColor: "#7bc043" }} data-color="#7bc043"></div>
        <div onClick={onColorClick} className="color-option" style={{ backgroundColor: "#0392cf" }} data-color="#0392cf"></div>
        <div onClick={onColorClick} className="color-option" style={{ backgroundColor: "#be29ec" }} data-color="#be29ec"></div>
      </div>
    </>
  );
};

export default ColorList;
