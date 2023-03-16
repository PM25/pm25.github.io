import React, { useEffect, useState } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    useParams,
    useLocation,
} from "react-router-dom";
import ReactGA from "react-ga";

import "./index.css";
import HomePage from "./section/homepage.jsx";
import ArticlePage from "./section/articlepage.jsx";

export default function Article() {
    return (
        <Router>
            <div id="article" className="main">
                <Switch>
                    <Route exact path={"/"}>
                        <ArticleHome />
                    </Route>
                    <Route exact path={"/articles"}>
                        <ArticleHome category={"computer-science"} />
                    </Route>
                    <Route exact path={"/articles/:id"}>
                        <ArticleHome />
                    </Route>
                    <Route path={"/articles/content/:id"}>
                        <ArticleChild />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

// main page of "article"
function ArticleHome(props) {
    useRouterGA();
    let { id } = useParams();
    // use props.category if it's given
    if (props.category) {
        id = props.category;
    }
    return <HomePage category={id} />;
}

// article page
function ArticleChild() {
    useRouterGA();
    let { id } = useParams();
    return <ArticlePage name={id} />;
}

// enable Google Analytics service
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
