import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

export default class BioSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            residence: {
                name: "Residence",
                icon: "fas fa-thumbtack",
                content: "Taipei, Taiwan",
            },
            hometown: {
                name: "Hometown",
                icon: "fas fa-search-location",
                content: "Taichung, Taiwan",
            },
            birthplace: {
                name: "Birthplace",
                icon: "fas fa-map-marked-alt",
                content: "Auckland, New Zealand",
            },
            email: {
                icon: "far fa-envelope",
                content: "pyhuang97@gmail.com",
                url: "mailto:pyhuang97@gmail.com",
            },
            bio: [
                "Hi! I am Pin-Yen, you can also call me Jason.",
                "I'm a M.S. student in Computer Science and Information Engineering at the National Taiwan University (NTU), advised by Prof. <a href='https://www.csie.ntu.edu.tw/~htlin/'>Hsuan-Tien Lin</a>. My research focuses on <b>artificial intelligence</b> and <b>machine learning</b>.",
            ],
        };
    }

    render() {
        return (
            <div className="bio">
                <h2 className="header">Introduction</h2>
                <div className="content">
                    <div className="info">
                        {this.renderInfoBlock(this.state.residence)}
                        {this.renderInfoBlock(this.state.hometown)}
                        {this.renderInfoBlock(this.state.birthplace)}
                        {this.renderInfoBlock(this.state.email)}
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
