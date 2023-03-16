import React, { PureComponent } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// images
import uiucLogo from "../img/uiuc_logo.webp";
import nccuLogo from "../img/nccu_logo.webp";
import nquLogo from "../img/nqu_logo.webp";
import utLogo from "../img/ut_logo.webp";

export default class ExperienceSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            experiences: [
                {
                    title: "Undergraduate Research Project",
                    organization: "National Chengchi University, Dept. of CS",
                    pi: "Prof. Peter Shaojui Wang",
                    pi_url: "https://sites.google.com/view/shaojuiwang",
                    keywords: [
                        "Privacy-preserving Machine Learning",
                        "Mondrian Anonymization",
                    ],
                    period: "Feb 2020 - Sep 2020",
                    logo: nccuLogo,
                    description: [
                        "Improved Mondrian Anonymization (a SOTA data anonymization algorithm) with Self‑Organizing Map.",
                        "Accelerated processing time by 76x (12.11 seconds to 0.16 seconds).",
                        "Improved the accuracy by 2% on data mining applications compared to the standard Mondrian anonymization.",
                        "Improved the robustness: the degree of variation is reduced by 75%.",
                    ],
                },
                {
                    title: "Ministry of Science & Technology Undergrad Research Project",
                    organization: "National Chengchi University, Dept. of CS",
                    pi: "Prof. Chao-Lin Liu",
                    pi_url: "http://www3.nccu.edu.tw/~chaolin/",
                    keywords: [
                        "Natural Language Processing",
                        "Named‑Entity Recognition",
                        "Computer Vision",
                        "Optical Character Recognition",
                    ],
                    period: "Sep 2019 - Mar 2020",
                    logo: nccuLogo,
                    description: [
                        "Designed a neural network model specifically for Literary Chinese named entity recognition (NER).",
                        "Improved the F1 score by 9% on Chinese local gazetteers by combining LSTM with CRF compared to the SOTA method.",
                        "Created a network that performs optical character recognition (OCR) for Literary Chinese.",
                        "Applied self‑organizing maps & clustering aggregation to group the same characters and accelerate the data labeling process by 12x.",
                    ],
                },
                {
                    title: "Undergraduate Summer Research Intern",
                    organization:
                        "University of Illinois Urbana-Champaign, Dept. of ECE",
                    pi: "Prof. Douglas L. Jones",
                    pi_url: "http://www.ifp.illinois.edu/~jones/",
                    keywords: [
                        "Audio Signal Processing",
                        "Onset & Offset Detection",
                        "Audio Classification",
                    ],
                    period: "July 2019 - Sep 2019",
                    logo: uiucLogo,
                    description: [
                        "Implemented onset & offset detection algorithms to automate the trimming and labeling of audio data.",
                        "Trimmed audio data is used for training audio classification models.",
                    ],
                },
                {
                    title: "Undergraduate Research Assistant",
                    organization: "National Quemoy University, Dept. of IEM",
                    pi: "Prof. Chia‑Chun Wu",
                    pi_url: "https://iem.nqu.edu.tw/eduieem/index.php?action=brands_detail&br_uid=15",
                    keywords: [
                        "Image Processing",
                        "Object Detection",
                        "Semi‑Supervised Learning",
                    ],
                    period: "Feb 2019 - Sep 2021",
                    logo: nquLogo,
                    description: [
                        "Implemented an image encryption algorithm based on chaos maps.",
                        "Implemented a semi‑supervised object detection algorithm, STAC, for detecting specific types of birds with only using 10% of labeled data.",
                    ],
                },
                {
                    title: "Undergraduate Research Assistant",
                    organization: "University of Taipei, Dept. of CS",
                    pi: "Prof. Cheng-Ying Yang",
                    pi_url: "https://utweb.utaipei.edu.tw/~cyang/",
                    keywords: ["Cryptography", "Communication System"],
                    period: "Sep 2017 - Sep 2020",
                    logo: utLogo,
                    description: [
                        "Proposed a theoretical solution for secret AF mode cooperative communication that is suitable for low computing power devices such as IoT.",
                        "Created a relay mapping scheme based on the greedy algorithm to search for the optimal assignment between the source and the relay.",
                        "Analyzed & visualized the performance and published final results to conference proceedings.",
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
            <div className="section" id="exp">
                <div className="container">
                    <h2 className="header">Research Experiences</h2>
                    <div className="content">
                        <div className="title-list">
                            <SimpleBar
                                forceVisible="y"
                                autoHide={true}
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
                <div className="infobar">
                    <div className="info-title">
                        PI:&nbsp;
                        <a
                            href={state.pi_url}
                            target="_blank"
                            rel="noreferrer"
                            className="link"
                        >
                            {state.pi}
                        </a>
                    </div>
                    <div className="period">
                        <i>{state.period}</i>
                    </div>
                </div>
                <div className="info-title">
                    {state.keywords == null
                        ? ""
                        : "Keywords: " + state.keywords.join(", ")}
                </div>

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
                <div className="subtitle">{props.organization}</div>
            </div>
        </div>
    );
}
