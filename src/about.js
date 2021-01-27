import React, { Component } from "react";
import ReactGA from "react-ga";
import "./about.css";
import IntroSection from "./sections/intro.jsx";
import SkillSection from "./sections/skills.jsx";
import ProfileSection from "./sections/profile.jsx";
import ActivitiesSection from "./sections/activities.jsx";
import ExperienceSection from "./sections/experiences.jsx";
import PublicationsSection from "./sections/publications.jsx";

ReactGA.initialize("UA-129342449-2");

export default class About extends Component {
    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        return (
            <div className="about">
                <ProfileSection></ProfileSection>
                <IntroSection></IntroSection>
                <ExperienceSection></ExperienceSection>
                <SkillSection></SkillSection>
                <ActivitiesSection></ActivitiesSection>
                <PublicationsSection></PublicationsSection>
            </div>
        );
    }
}
