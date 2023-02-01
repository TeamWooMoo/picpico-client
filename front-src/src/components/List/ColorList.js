import React from "react";
import { FlexboxGrid } from "rsuite";
import { setStrokeColorInfo } from "../../slice/drawingInfo";
import store from "../../store";
import "./ColorList.css";
import white from "./../../assets/images/color/white.png";
import red from "./../../assets/images/color/red.png";
import orange from "./../../assets/images/color/orange.png";
import yellow from "./../../assets/images/color/yellow.png";
import green from "./../../assets/images/color/green.png";
import blue from "./../../assets/images/color/blue.png";
import purple from "./../../assets/images/color/purple.png";
import black from "./../../assets/images/color/black.png";

const ColorList = () => {
    const onColorClick = event => {
        const color = event.target.dataset.color;
        store.dispatch(setStrokeColorInfo({ value: color }));
    };
    return (
        <>
            <FlexboxGrid justify="center" className="color-options">

                <img src={white} onClick={onColorClick} className="color-option" data-color="white" />
                <img src={red} onClick={onColorClick} className="color-option" data-color="#ee4035" />
                <img src={orange} onClick={onColorClick} className="color-option" data-color="#f37736" />
                <img src={yellow} onClick={onColorClick} className="color-option" data-color="#fdf498" />
                <img src={green} onClick={onColorClick} className="color-option" data-color="#7bc043" />
                <img src={blue} onClick={onColorClick} className="color-option" data-color="#0392cf" />
                <img src={purple} onClick={onColorClick} className="color-option" data-color="#be29ec" />
                <img src={black} onClick={onColorClick} className="color-option" data-color="black" />

            </FlexboxGrid>
        </>
    );
};

export default ColorList;
