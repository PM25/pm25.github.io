import React from "react";
import "./article.css";
import HomePage from "./section/homepage.jsx";
import ArticlePage from "./section/articlepage.jsx";
import {
    HashRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { useRouterGA } from "./components/src/google-analytics";

export default function Article() {
    return (
        <Router>
            <div id="article" className="main">
                <Switch>
                    <Route exact path={"/"}>
                        <Home />
                    </Route>
                    <Route exact path={"/article"}>
                        <Home />
                    </Route>
                    <Route path={"/article/:id"}>
                        <Child />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    useRouterGA();
    return <HomePage />;
}

function Child() {
    useRouterGA();
    let { id } = useParams();
    return <ArticlePage name={id} />;
}
