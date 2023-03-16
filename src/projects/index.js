import React from "react";
import { Helmet } from "react-helmet";

import "./index.css";
import Header from "./section/header.jsx";
import ProjectBlocks from "./section/projectblocks.jsx";

export default function Project() {
    return (
        <div id="project" className="main">
            <Helmet>
                <title>Project - PlusMore</title>
                <meta name="description" content="my side projects" />
            </Helmet>
            <Header />
            <div className="projects-list">
                <ProjectBlocks />
            </div>
        </div>
    );
}
