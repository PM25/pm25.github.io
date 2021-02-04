import React, { PureComponent } from "react";

export default class FlipList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            flipList: [
                "knowledge",
                "happiness",
                "motivation",
                "prospective",
                "idea",
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
