import React from "react";

export default function SimpleHeader(props) {
    return (
        <div className="header" style={{ height: "13em" }}>
            <div className="title-box">
                <div className="title" style={{ fontSize: "3em" }}>
                    {props.title}
                </div>
                <div className="date">
                    <a href="https://pm25.github.io">Pin-Yen</a>・{props.date}
                </div>
            </div>
        </div>
    );
}
