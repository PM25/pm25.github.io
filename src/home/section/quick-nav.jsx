import React, { PureComponent } from "react";
import { HashRouter as Router, Link } from "react-router-dom";

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
            <Router>
                <div className="quick-nav">
                    {this.state.quickNav.map((state, key) => {
                        return (
                            <Link
                                key={key}
                                to={state.url}
                                style={{ backgroundColor: state.color }}
                            >
                                {state.name}
                            </Link>
                        );
                    })}
                </div>
            </Router>
        );
    }
}
