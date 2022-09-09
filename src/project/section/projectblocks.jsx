import React, { PureComponent, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
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
                    idx={this.state.sourceData.length - key}
                    img={state.img}
                    url={state.url}
                    github={state.github}
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

            <div className="info">
                <div className="name">{props.idx + ". " + props.name}</div>
                <div className="linkbar">
                    <LinkButton
                        url={props.url}
                        icon="fas fa-link"
                        name="Website"
                        color="#277BC077"
                    />
                    <LinkButton
                        url={"https://github.com/" + props.github}
                        icon="fab fa-github"
                        name="Github"
                        color="#7D9D9C77"
                    />
                    <GitHubButton
                        href={"https://github.com/" + props.github}
                        data-icon="octicon-star"
                        data-show-count="true"
                        data-size="large"
                        aria-label={"Star " + props.github + " on GitHub"}
                    >
                        Star
                    </GitHubButton>
                </div>
                <LazyLoad offset={100}>
                    <IntroParagraph github={props.github} />
                </LazyLoad>
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
                    <i className={props.icon + " link-icon"}></i> {props.name}
                </a>
            ) : (
                ""
            )}
        </span>
    );
}

function IntroParagraph(props) {
    const [data, setData] = useState({ intro: "", max_len: 255 });

    // fetch and process the introduction from github README.md
    useEffect(() => {
        if (data.intro === "") {
            fetch(
                "https://raw.githubusercontent.com/" +
                    props.github +
                    "/master/README.md"
            ).then((r) => {
                r.text().then((d) => {
                    // remove the first line
                    let lines = d.trim().split("\n");
                    lines.splice(0, 1);
                    d = lines.join(" ");
                    // change all "<br>" to " "
                    lines = d.trim().split("<br>");
                    d = lines.join(" ");
                    // remove non-introduction part
                    d = d.split("#")[0];
                    // get first n characters only
                    d = d.slice(0, data.max_len);
                    // remove the last word (in case it's not completed)
                    lines = d.split(" ");
                    lines.pop();
                    d = lines.join(" ");
                    // add a message if there's no word
                    if (d === "") d = "There is no description yet";
                    d = d + "...";
                    console.log(d);
                    // save the result
                    setData({ intro: d });
                });
            });
        }
    });

    return (
        <ReactMarkdown
            allowDangerousHtml={true}
            linkTarget="_blank"
            children={data.intro}
            className="intro"
        />
    );
}
