import React from "react";
import "./project.css";
import Header from "./section/header.jsx";
import ProjectBlocks from "./section/projectblocks.jsx";

export default function Project() {
    return (
        <div id="project" className="main">
            <Header />
            <div className="projects-list">
                <ProjectBlocks />
            </div>
        </div>
    );
}
