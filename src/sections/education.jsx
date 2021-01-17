import React, { Component } from "react";

// images
import ntuLogo from "../img/ntu_logo.webp";
import nccuLogo from "../img/nccu_logo.webp";
import ncnuLogo from "../img/ncnu_logo.webp";
import tcsshLogo from "../img/tcssh_logo.webp";

export default class EducationSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ntu: {
                name: "National Taiwan University",
                degree: "Master of Science",
                department: "Computer Science and Information Engineering",
                period: "2020.9 - Present",
                logo: ntuLogo,
                status: "current",
            },
            nccu: {
                name: "National Chengchi University",
                degree: "Bachelor of Science",
                department: "Computer Science",
                period: "2018.9 - 2020.6",
                logo: nccuLogo,
                status: "before",
            },
            ncnu: {
                name: "National Chi Nan University",
                degree: "Bachelor of Science",
                department: "Computer Science and Information Engineering",
                period: "2016.9 - 2018.6",
                logo: ncnuLogo,
                status: "before",
            },
            tcssh: {
                name: "Taichung Second Senior High School",
                degree: "Senior High School",
                department: "Regular",
                period: "2013.9 - 2016.6",
                logo: tcsshLogo,
                status: "before",
            },
        };
    }

    render() {
        return (
            <div className="education">
                <h2 className="header">Education</h2>
                <div className="content">
                    <div className="timeline-container">
                        <div className="edu-timeline">
                            {this.renderEdu(this.state.ntu)}
                            {this.renderEdu(this.state.nccu)}
                            {this.renderEdu(this.state.ncnu)}
                            {this.renderEdu(this.state.tcssh)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderEdu(state) {
        return (
            <EducationBlock
                status={state.status}
                name={state.name}
                degree={state.degree}
                department={state.department}
                period={state.period}
                logo={state.logo}
            ></EducationBlock>
        );
    }
}

function EducationBlock(props) {
    return (
        <div className={"container " + props.status}>
            <div className="content">
                <div className="school">
                    <img src={props.logo} alt="logo"></img>
                    <span>{props.name}</span>
                </div>
                <div className="major">
                    <div>
                        {props.degree}, {props.department}
                    </div>
                    <div>{props.period}</div>
                </div>
            </div>
        </div>
    );
}
