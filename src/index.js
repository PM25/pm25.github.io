import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import About from "./about";
import Home from "./home/home";
import Project from "./project/project";
import Article from "./article/article";
import Footer from "./components/src/footer";
import Navigator from "./components/src/navigator";
import { useRouterGA } from "./components/src/google-analytics";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Navigator></Navigator>
            <Switch>
                <Route exact path="/">
                    <AboutPage />
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/project">
                    <ProjectPage />
                </Route>
                <Route path="/article">
                    <Article />
                </Route>
            </Switch>
            <Footer></Footer>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

function AboutPage(props) {
    useRouterGA();
    return <About />;
}

function HomePage(props) {
    useRouterGA();
    return <Home />;
}

function ProjectPage(props) {
    useRouterGA();
    return <Project />;
}
