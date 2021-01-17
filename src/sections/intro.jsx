import React, { Component } from "react";
import BioSection from "./bio";
import EducationSection from "./education";

export default class IntroSection extends Component {
    render() {
        return (
            <div id="intro" className="section">
                <EducationSection></EducationSection>
                <BioSection></BioSection>
            </div>
        );
    }
}
