import React, { PureComponent } from "react";
import "./app.css";
import Header from "./section/header.jsx";
import Content from "./section/content.jsx";
import Article from "./section/article.jsx";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            header: null,
            date: null,
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Content />
                        </Route>
                        <Route path="/:id/:id">
                            <Child />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function Child() {
    let { url } = useRouteMatch();
    return <Article path={url} />;
}
