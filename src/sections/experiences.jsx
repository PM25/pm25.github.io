import React, { Component } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// images
import uiucLogo from "../img/uiuc_logo.webp";
import nccuLogo from "../img/nccu_logo.webp";
import utLogo from "../img/ut_logo.webp";

export default class ExperienceSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experiences: [
                {
                    title: "Undergraduate Summer Research Internship",
                    organization:
                        "University of Illinois Urbana-Champaign (UIUC)",
                    supervisor: "Advisor: Prof. Douglas L. Jones",
                    period: "July 2019 - Sep 2019",
                    logo: uiucLogo,
                    description: [
                        "Developed onset & offset detection algorithms for specific type of audio signals by python.",
                        "Built a system to automate the process of trim and labeling audio data.",
                    ],
                },
                {
                    title:
                        "Research Scholarship from Ministry of Science and Technology",
                    organization: "National Chengchi University",
                    supervisor: "Advisor: Prof. Chao-Lin Liu",
                    period: "July 2019 - Feb 2020",
                    logo: nccuLogo,
                    description: [
                        "Developed a named-entity recognition (NER) system for Literary Chinese.",
                        "Improve the F1 score by 9% by applying machine learning technique(LSTM-CRF).",
                        "Built an optical character recognition (OCR) system for Literary Chinese with machine learning.",
                        "Applied self-organizing map & clustering aggregation to increase the speed of labeling data by human by 12x.",
                    ],
                },
                {
                    title: "Undergraduate Research Assistant",
                    organization: "University of Taipei",
                    supervisor: "Advisor: Prof. Cheng-Ying Yang",
                    period: "Sep 2017 - Present",
                    logo: utLogo,
                    description: [
                        "Improved the performance of encryption algorithm in IoT devices.",
                        "Used greedy algorithm to get secured encryption even with poor computing resources.",
                        "Analysised and visualized the performance and published final results to journal.",
                    ],
                },
            ],
            focusBlockIdx: 0,
        };
    }

    onMouseEnter(key) {
        this.setState({ focusBlockIdx: key });
    }

    render() {
        return (
            <div id="exp" className="section">
                <h2 className="header">Experiences</h2>
                <div className="content">
                    <div className="title-list">
                        <SimpleBar
                            forceVisible="y"
                            autoHide={false}
                            style={{ maxHeight: "100%" }}
                        >
                            {this.state.experiences.map((value, key) => {
                                return this.renderExperienceBlock(
                                    value,
                                    key === this.state.focusBlockIdx
                                        ? true
                                        : false,
                                    () => this.onMouseEnter(key)
                                );
                            })}
                        </SimpleBar>
                    </div>
                    {this.renderInfoBlock()}
                </div>
            </div>
        );
    }

    renderExperienceBlock(state, focus, onMouseEnter, onMouseLeave) {
        return (
            <ExperienceBlock
                logo={state.logo}
                title={state.title}
                focus={focus}
                organization={state.organization}
                onMouseEnter={onMouseEnter}
            ></ExperienceBlock>
        );
    }

    renderInfoBlock() {
        let idx = this.state.focusBlockIdx;
        let state = this.state.experiences[idx];
        return (
            <SimpleBar style={{ maxHeight: "100%" }} className="info">
                <div className="period">
                    <i>{state.period}</i>
                </div>
                <div className="supervisor">{state.supervisor}</div>
                <ul className="description">
                    {state.description.map((value, key) => {
                        return <li>{value}</li>;
                    })}
                </ul>
            </SimpleBar>
        );
    }
}

function ExperienceBlock(props) {
    return (
        <div
            className={props.focus ? "item focus-light" : "item"}
            onMouseEnter={() => props.onMouseEnter()}
        >
            <img src={props.logo} alt="logo"></img>
            <div className="title">
                <div>{props.title}</div>
                <div>{props.organization}</div>
            </div>
        </div>
    );
}
