import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Footer from "./components/src/footer";
import Navigator from "./components/src/navigator";
import { useRouterGA } from "./components/src/google-analytics";

function Loader() {
    return <div>Loading...</div>;
}

const load = (Component) => (props) => (
    <Suspense fallback={<Loader />}>
        <Component {...props} />
    </Suspense>
);

const Home = load(lazy(() => import("./home")));
const About = load(lazy(() => import("./about")));
const Project = load(lazy(() => import("./project")));
const Article = load(lazy(() => import("./article")));

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
