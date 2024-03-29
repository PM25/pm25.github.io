import React from "react";
import { Helmet } from "react-helmet";

import "./index.css";
import IntroSection from "./sections/intro.jsx";
import SkillSection from "./sections/skills.jsx";
import ProfileSection from "./sections/profile.jsx";
import TalksSection from "./sections/talks.jsx";
import ExperienceSection from "./sections/experiences.jsx";
import PublicationsSection from "./sections/publications.jsx";

export default function About() {
    return (
        <div className="about">
            <Helmet>
                <title>Pin-Yen Huang - PlusMore</title>
                <meta name="description" content="information about me" />
            </Helmet>
            <ProfileSection></ProfileSection>
            <IntroSection></IntroSection>
            <ExperienceSection></ExperienceSection>
            <SkillSection></SkillSection>
            <TalksSection></TalksSection>
            <PublicationsSection></PublicationsSection>
        </div>
    );
}
