import React, { PureComponent } from "react";
import BioSection from "./bio";
import EducationSection from "./education";

export default class IntroSection extends PureComponent {
    render() {
        return (
            <div id="intro" className="section">
                <EducationSection></EducationSection>
                <BioSection></BioSection>
            </div>
        );
    }
}
