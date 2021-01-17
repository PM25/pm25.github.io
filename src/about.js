import React, { Component } from "react";
import "./about.css";
import IntroSection from "./sections/intro.jsx";
import SkillSection from "./sections/skills.jsx";
import ProfileSection from "./sections/profile.jsx";
import ExperienceSection from "./sections/experiences.jsx";

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <ProfileSection></ProfileSection>
                <IntroSection></IntroSection>
                <ExperienceSection></ExperienceSection>
                <SkillSection></SkillSection>
            </div>
        );
    }
}
