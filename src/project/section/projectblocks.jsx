import React, { PureComponent } from "react";
import LazyLoad from "react-lazyload";
import GitHubButton from "react-github-btn";

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
            return (
                <ProjectBlock
                    name={state.name}
                    date={state.date}
                    img={state.img}
                    url={state.url}
                    github={state.github}
                    // description={state.description}
                ></ProjectBlock>
            );
        });
    }
}

function ProjectBlock(props) {
    return (
        <div className="item">
            <LazyLoad offset={100}>
                <img src={props.img} alt="Preview" className="preview"></img>
            </LazyLoad>

            <div className="intro">
                <div className="name">{props.name}</div>
                <div className="linkbar">
                    <LinkButton
                        url={props.url}
                        icon="fas fa-link"
                        name="Website"
                        color="#277BC077"
                    />
                    <LinkButton
                        url={props.github}
                        icon="fab fa-github"
                        name="Github"
                        color="#7D9D9C77"
                    />
                    <GitHubButton
                        href={props.github}
                        data-icon="octicon-star"
                        data-show-count="true"
                        data-size="large"
                        aria-label={"Star " + props.github + " on GitHub"}
                    >
                        Star
                    </GitHubButton>
                </div>
                <div className="date">{props.date}</div>
            </div>
        </div>
    );
}

function LinkButton(props) {
    return (
        <span>
            {props.url ? (
                <a
                    href={props.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                    style={{ background: props.color }}
                >
                    <i className={props.icon}></i> {props.name}
                </a>
            ) : (
                ""
            )}
        </span>
    );
}
