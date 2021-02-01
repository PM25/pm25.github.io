import React, { PureComponent } from "react";
import sourceData from "../source/list.json";

export default class ProjectBlocks extends PureComponent {
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
    return (
        <a href={props.url} target="_blank" rel="noreferrer">
            {props.name}
        </a>
    );
}
