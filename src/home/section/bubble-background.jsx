import React from "react";

export default function BubbleBackground() {
    let bubbles = [];
    for (let i = 0; i <= 10; ++i) {
        bubbles.push(<Bubble left={10 * i + "vw"} />);
    }
    return <ul className="bg-bubbles">{bubbles}</ul>;
}

function Bubble(props) {
    let size = random(20, 200);
    let width = size + "px",
        height = width,
        bottom = -size,
        animationDelay = random(0, 15) + "s",
        animationDuration = random(15, 60) + "s";

    return (
        <li
            style={{
                left: props.left,
                width,
                height,
                bottom,
                animationDelay,
                animationDuration,
            }}
        ></li>
    );
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
