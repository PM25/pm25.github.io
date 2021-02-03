import React, { PureComponent } from "react";

export default class FlipList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            flipList: [
                "Knowledge",
                "Happiness",
                "Motivation",
                "Prospective",
                "Idea",
            ],
        };
    }

    render() {
        return (
            <div className="flip-list">
                <ul>
                    {this.state.flipList.map((text, key) => {
                        return <li key={key}>{text}</li>;
                    })}
                </ul>
            </div>
        );
    }
}
