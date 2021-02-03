import React from "react";
import { Helmet } from "react-helmet";

import "./home.css";
import Header from "./section/header.jsx";
import QuickNav from "./section/quick-nav.jsx";
import FlipList from "./section/flip-list.jsx";
import BubbleBackground from "./section/bubble-background.jsx";

export default function Home() {
    return (
        <div id="home">
            <Helmet>
                <title>Home | PlusMore</title>
                <meta name="description" content="homepage of PlusMore" />
            </Helmet>
            <div className="header">
                <BubbleBackground />
                <div className="title-box">
                    <Header />
                    <FlipList />
                </div>
            </div>
            <QuickNav />
        </div>
    );
}
