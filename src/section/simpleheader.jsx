import React from "react";

export default function SimpleHeader(props) {
    return (
        <div id="header">
            <div className="title-box">
                <div className="title">{props.title}</div>
                <div className="date">Pin-Yen・{props.date}</div>
            </div>
        </div>
    );
}
