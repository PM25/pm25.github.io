import React, { PureComponent } from "react";

// images & other files
import profileImg from "../img/profile2.webp";
import cvPDF from "../source/cv_v3.pdf";

export default class ProfileSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="section" id="profile">
                <div className="header">
                    <div className="profile-img">
                        <img src={profileImg} alt="Profile"></img>
                    </div>
                    <div className="basic-info">
                        <div className="title-box">
                            <span className="name">
                                <div>黃品硯</div>
                                <div className="alt">Pin-Yen (Jason) Huang</div>
                            </span>
                            <span className="title">
                                <a href="https://learner.csie.ntu.edu.tw">
                                    CLLab
                                </a>
                                •National Taiwan University
                            </span>
                            <div className="info">
                                <a
                                    href="https://www.linkedin.com/in/py-huang"
                                    data-tootik="LinkedIn"
                                    data-tootik-conf="bottom"
                                >
                                    <i
                                        className="fab fa-linkedin"
                                        aria-hidden="true"
                                        title="LinkedIn"
                                    ></i>
                                </a>
                                <a
                                    href="https://scholar.google.com.tw/citations?user=nQdpH2MAAAAJ"
                                    data-tootik="Google Scholar"
                                    data-tootik-conf="bottom"
                                >
                                    <i
                                        className="fas fa-graduation-cap"
                                        aria-hidden="true"
                                        title="Google Scholar"
                                    ></i>
                                </a>
                                <a
                                    href={cvPDF}
                                    data-tootik="Résumé"
                                    data-tootik-conf="bottom"
                                >
                                    <i
                                        className="far fa-id-badge"
                                        aria-hidden="true"
                                        title="Résumé"
                                    ></i>
                                </a>
                                <a
                                    href="https://github.com/PM25"
                                    data-tootik="Github"
                                    data-tootik-conf="bottom"
                                >
                                    <i
                                        className="fab fa-github"
                                        aria-hidden="true"
                                        title="Github"
                                    ></i>
                                </a>
                                <a
                                    href="https://www.facebook.com/pyhuang97"
                                    data-tootik="Facebook"
                                    data-tootik-conf="bottom"
                                >
                                    <i
                                        className="fab fa-facebook-square"
                                        aria-hidden="true"
                                        title="Facebook"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
