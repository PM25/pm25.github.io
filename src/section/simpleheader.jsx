import React from "react";

export default function SimpleHeader(props) {
    return (
        <div id="header" style={{ height: "13em" }}>
            <div className="title-box">
                <div className="title" style={{ fontSize: "3em" }}>
                    {props.title}
                </div>
                <div className="date">Pin-Yen・{props.date}</div>
            </div>
        </div>
    );
}
