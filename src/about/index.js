import React from "react";
import { Helmet } from "react-helmet";

import "./index.css";
import IntroSection from "./sections/intro.jsx";
import SkillSection from "./sections/skills.jsx";
import ProfileSection from "./sections/profile.jsx";
import ActivitiesSection from "./sections/activities.jsx";
import ExperienceSection from "./sections/experiences.jsx";
import PublicationsSection from "./sections/publications.jsx";

export default function About() {
    return (
        <div className="about">
            <Helmet>
                <title>About Me - PlusMore</title>
                <meta name="description" content="information about me" />
            </Helmet>
            <ProfileSection></ProfileSection>
            <IntroSection></IntroSection>
            <ExperienceSection></ExperienceSection>
            <SkillSection></SkillSection>
            <ActivitiesSection></ActivitiesSection>
            <PublicationsSection></PublicationsSection>
        </div>
    );
}
