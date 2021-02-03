import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { HashRouter as Router, useLocation } from "react-router-dom";

import "./project.css";
import Header from "./section/header.jsx";
import ProjectBlocks from "./section/projectblocks.jsx";

export default function Project() {
    return (
        <Router>
            <ProjectPage />
        </Router>
    );
}

function ProjectPage() {
    useRouterGA();
    return (
        <div id="project" className="main">
            <Header />
            <div className="projects-list">
                <ProjectBlocks />
            </div>
        </div>
    );
}

const useRouterGA = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        ReactGA.initialize("UA-129342449-2");
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
            ReactGA.pageview(location.pathname + location.search);
        }
    }, [initialized, location]);
};
