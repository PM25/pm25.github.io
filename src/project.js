import React, { PureComponent } from "react";
import "./project.css";
import sourceData from "./source/list.json";
import { useGA } from "./components/src/google-analytics";

export default function Project() {
    useGA();
    return (
        <div id="project" className="main">
            <div className="header">
                <a href=".">Project</a>
            </div>
            <div className="projects-list">
                <ProjectBlocks />
            </div>
        </div>
    );
}

class ProjectBlocks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: sourceData,
        };
    }

    render() {
        return this.state.sourceData.map((state, key) => {
            return <ProjectBlock id={key} name={state.name} url={state.url} />;
        });
    }
}

function ProjectBlock(props) {
    useGA();
    return (
        <a href={props.url} target="_blank" rel="noreferrer">
            {props.name}
        </a>
    );
}
