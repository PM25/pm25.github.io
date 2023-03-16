import React, { PureComponent } from "react";

// images
import ntuLogo from "../img/ntu_logo.webp";
import nccuLogo from "../img/nccu_logo.webp";
import ncnuLogo from "../img/ncnu_logo.webp";
// import tcsshLogo from "../img/tcssh_logo.webp";

export default class EducationSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            educations: [
                {
                    name: "National Taiwan University",
                    degree: "MS",
                    department:
                        "Computer Science and Information Engineering (Artificial Intelligence Program)",
                    period: "2020.9 - Present",
                    logo: ntuLogo,
                    status: "current",
                },
                {
                    name: "National Chengchi University",
                    degree: "BS",
                    department: "Computer Science",
                    period: "2018.9 - 2020.6",
                    logo: nccuLogo,
                    status: "before",
                },
                {
                    name: "National Chi Nan University",
                    degree: "BS",
                    department: "Computer Science and Information Engineering",
                    period: "2016.9 - 2018.6",
                    logo: ncnuLogo,
                    status: "before",
                },
                // {
                //     name: "Taichung Second Senior High School",
                //     degree: "Senior High School",
                //     department: "",
                //     period: "2013.9 - 2016.6",
                //     logo: tcsshLogo,
                //     status: "before",
                // },
            ],
        };
    }

    render() {
        return (
            <div className="education">
                <h2 className="header">Education</h2>
                <div
                    className="timeline-container"
                    style={{
                        height: this.state.educations.length * 3.5 + "em",
                    }}
                >
                    <div className="edu-timeline">
                        {this.state.educations.map((value, key) => {
                            return this.renderEdu(value);
                        })}
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
                <div className="major subtitle">
                    <div>
                        {props.degree}, {props.department}
                    </div>
                    <div>{props.period}</div>
                </div>
            </div>
        </div>
    );
}
