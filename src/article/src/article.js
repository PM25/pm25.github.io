import React, { useEffect, useState } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    useParams,
    useLocation,
} from "react-router-dom";
import ReactGA from "react-ga";

import "./article.css";
import HomePage from "./section/homepage.jsx";
import ArticlePage from "./section/articlepage.jsx";

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

const useRouterGA = () => {
    const location = useLocation();
    console.log(location);
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
