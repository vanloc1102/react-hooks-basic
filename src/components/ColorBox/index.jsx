import React, { useState, Fragment } from "react";
import "./ColorBox.scss";

function getRandomColor() {
    const COLOR_LIST = ["blue", "green", "orange", "red", "purple"];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}
function ColorBox(props) {
    const [color, setColor] = useState(() => {
        const initialColor = localStorage.getItem("box_color") || "green";
        return initialColor;
    });

    function handleBoxClick() {
        //get random color -> set color
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem("box_color", newColor);
    }
    return (
        <Fragment>
            <p>Click on the box to change the color</p>
            <div
                className="color-box"
                style={{ backgroundColor: color }}
                onClick={handleBoxClick}
            ></div>
        </Fragment>
    );
}

export default ColorBox;
