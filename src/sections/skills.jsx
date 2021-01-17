import React, { Component } from "react";
import { useSpring, animated } from "react-spring";
import ReactHtmlParser from "react-html-parser";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// images
import pythonLogo from "../img/python_logo.webp";
import cppLogo from "../img/cpp_logo.webp";
import javascriptLogo from "../img/javascript_logo.webp";
import lispLogo from "../img/lisp_logo.webp";
import pytorchLogo from "../img/pytorch_logo.webp";

export default class SkillSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillsText: [
                {
                    name: "programming languages",
                    icon: "fas fa-code",
                    content:
                        "<b>(proficient):</b> Python, C/C++, JavaScript, Lisp, Shell Script <br><b>(familiar):</b> R, Matlab",
                },
                {
                    name: "tools",
                    icon: "fas fa-wrench",
                    content: "VSCode, Vim, Emacs, Git, Github, Google Cloud",
                },
                {
                    name: "others",
                    icon: "fas fa-server",
                    content:
                        "Linux/Unix, Arduino, Raspberry Pi, PyTorch, Keras, HTML/CSS, Markdown, LaTeX",
                },
            ],
            skillsLevel: [
                {
                    name: "Python",
                    level: 92,
                    logo: pythonLogo,
                },
                {
                    name: "C/C++",
                    level: 93,
                    logo: cppLogo,
                },
                {
                    name: "Javascript",
                    level: 90,
                    logo: javascriptLogo,
                },
                {
                    name: "Lisp",
                    level: 88,
                    logo: lispLogo,
                },
                {
                    name: "PyTorch",
                    level: 91,
                    logo: pytorchLogo,
                },
            ],
            activeSkillsLevel: false,
        };

        this.contentRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        let node = this.contentRef.current;
        let top_offset = node.getBoundingClientRect().top;
        // if is visible on the screen
        if (top_offset >= 0 && top_offset < window.innerHeight) {
            this.setState({ activeSkillsLevel: true });
        } else {
            this.setState({ activeSkillsLevel: false });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        return (
            <div className="section" id="skills">
                <h2 className="header">Skills</h2>
                <div className="content" ref={this.contentRef}>
                    <SimpleBar className="details">
                        {this.state.skillsText.map((state, key) => {
                            return this.renderSkillsTextBlock(state);
                        })}
                    </SimpleBar>
                    <ul>
                        {this.state.skillsLevel.map((state, key) => {
                            return this.renderSkillsLevelBlock(state);
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    renderSkillsTextBlock(state) {
        return (
            <SkillsTextBlock
                name={state.name}
                icon={state.icon}
                content={state.content}
            ></SkillsTextBlock>
        );
    }

    renderSkillsLevelBlock(state) {
        let level = state.level;
        // if (this.state.activeSkillsLevel === false) {
        //     level = 0;
        // }
        return (
            <SkillsLevelBlock
                name={state.name}
                logo={state.logo}
                level={level}
                active={true}
            ></SkillsLevelBlock>
        );
    }
}

function SkillsTextBlock(props) {
    return (
        <div>
            <h3>
                <i className={props.icon + " icon"}></i>
                <span>{props.name}</span>
            </h3>
            <div>{ReactHtmlParser(props.content)}</div>
        </div>
    );
}

function SkillsLevelBlock(props) {
    const progessBarProps = useSpring({
        from: { percent: 0 },
        to: { percent: props.level },
    });

    return (
        <li>
            <div className="logo-wrapper">
                <img src={props.logo} alt="logo"></img>
            </div>
            <span>{props.name}</span>
            <animated.div style={progessBarProps} className="progress-bar">
                {({ percent }) => (
                    <div
                        className="progress-bar-fill"
                        style={{
                            width: `${percent}%`,
                        }}
                    ></div>
                )}
            </animated.div>
        </li>
    );
}