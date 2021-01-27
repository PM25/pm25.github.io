import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";
import About from "./about";
import Home from "./home/src/home";
import Project from "./project/src/project";
import Article from "./article/src/article";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Navigator></Navigator>
            <Switch>
                <Route exact path="/">
                    <About />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/project">
                    <Project />
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
