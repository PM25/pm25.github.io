import React, { PureComponent } from "react";
import "./article.css";
import HomePage from "./section/homepage.jsx";
import ArticlePage from "./section/articlepage.jsx";
import {
    HashRouter as Router,
    Switch,
    Route,
    useParams,
    useRouteMatch,
} from "react-router-dom";

export default class Article extends PureComponent {
    render() {
        return (
            <Router>
                <ArticleMain />
            </Router>
        );
    }
}

function ArticleMain() {
    let { url } = useRouteMatch();
    return (
        <div id="article" className="main">
            <Switch>
                <Route exact path={"/article"}>
                    <HomePage />
                </Route>
                <Route path={"/article/:id"}>
                    <Child />
                </Route>
            </Switch>
        </div>
    );
}

function Child() {
    let { id } = useParams();
    return <ArticlePage name={id} />;
}
