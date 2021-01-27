import React, { PureComponent } from "react";
import "./project.css";
import sourceData from "./source/list.json";

export default class Project extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: sourceData,
        };
    }

    render() {
        return (
            <div id="project" class="main">
                <div class="header">
                    <a href=".">Project</a>
                </div>
                <div class="projects-list">
                    {this.state.sourceData.map((state, key) => {
                        return (
                            <ProjectBlock
                                id={key}
                                name={state.name}
                                url={state.url}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

function ProjectBlock(props) {
    return (
        <a href={props.url} target="_blank" rel="noreferrer">
            {props.name}
        </a>
    );
}
