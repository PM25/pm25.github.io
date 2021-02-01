import React, { PureComponent } from "react";

export default class QuickNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            quickNav: [
                { name: "news", url: "#news", color: "#65c6c4" },
                { name: "about", url: "/", color: "#408ab4" },
                { name: "article", url: "/article", color: "#34699a" },
                { name: "project", url: "/project", color: "#113f67" },
            ],
        };
    }

    render() {
        return (
            <div className="quick-nav">
                {this.state.quickNav.map((state, key) => {
                    return (
                        <a
                            key={key}
                            href={state.url}
                            style={{ backgroundColor: state.color }}
                        >
                            {state.name}
                        </a>
                    );
                })}
            </div>
        );
    }
}
