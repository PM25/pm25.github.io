import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";
import About from "./about";
import Home from "./home/src/home";
import Project from "./project/src/project";
import Article from "./article/src/article";
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
                    <ArticlePage />
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

function ArticlePage(props) {
    useRouterGA();
    return <Article />;
}
