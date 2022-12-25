import React, { PureComponent } from "react";
import ReactHtmlParser from "react-html-parser";

export default class BioSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            info: [
                // {
                //     name: "Residence",
                //     icon: "fas fa-thumbtack",
                //     content: "Taipei, Taiwan",
                // },
                {
                    name: "Hometown",
                    icon: "fas fa-search-location",
                    content: "Taichung, Taiwan",
                },
                // {
                //     name: "Birthplace",
                //     icon: "fas fa-map-marked-alt",
                //     content: "Auckland, New Zealand",
                // },
                {
                    icon: "far fa-envelope",
                    content: "pyhuang97@gmail.com",
                    // url: "mailto:pyhuang97@gmail.com",
                },
            ],
            bio: [
                "I am a Computer Science M.S. student at National Taiwan University (NTU), advised by <a href='http://www.digital.ntu.edu.tw/hsiang/english.html' target='_blank' rel='noreferrer' class='link'>Prof. Jieh Hsiang</a>. My research focuses on machine learning with limited labeled data, particularly on understanding their trustworthiness. Prior to joining NTU, I obtained my B.S. degree in Computer Science at National Chengchi University (NCCU).",
            ],
        };
    }

    render() {
        return (
            <div className="bio">
                <h2 className="header">Introduction</h2>
                <div className="content">
                    <div className="info">
                        {this.state.info.map((value, key) => {
                            return this.renderInfoBlock(value);
                        })}
                    </div>
                    <div className="paragraph">
                        {/* add linebreak(div) at the end of each of sentence */}
                        {this.state.bio.map((sentence, key) => {
                            return (
                                <div key={key}>{ReactHtmlParser(sentence)}</div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    renderInfoBlock(state) {
        return (
            <InfoBlock
                icon={state.icon}
                name={state.name}
                content={state.content}
                url={state.url}
            ></InfoBlock>
        );
    }
}

function InfoBlock(props) {
    return (
        <div className="info-block">
            <i className={props.icon + " icon"}></i>
            <span>
                {props.name ? props.name + ": " : ""}
                {props.url ? (
                    <a href={props.url}>{props.content}</a>
                ) : (
                    props.content
                )}
            </span>
        </div>
    );
}
