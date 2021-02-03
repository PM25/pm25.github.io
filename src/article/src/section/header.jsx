import React, { PureComponent } from "react";

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: [
                ["green", "print"],
                ["white", "("],
                ["red", '"Hello, World!"'],
                ["white", ")"],
            ],
            color: {
                green: "#31a09e",
                red: "#db3c41",
                white: "#fff",
            },
        };
    }

    render() {
        return (
            <div className="header">
                <div className="title-box">
                    <div className="title typing-animation">
                        {this.state.title.map((value, key) => {
                            let color = this.state.color[value[0]];
                            return (
                                <span key={key} style={{ color: color }}>
                                    {value[1]}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
