import React, { PureComponent } from "react";
import "./article.css";
import HomePage from "./section/homepage.jsx";
import ArticlePage from "./section/articlepage.jsx";
import {
    HashRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

export default class Article extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            date: null,
        };
    }

    setHeader = (title, date) => {
        this.setState({ title: title, date: date });
    };

    render() {
        return (
            <Router>
                <div id="main">
                    <Switch>
                        <Route exact path="/">
                            <HomePage setHeader={this.setHeader} />
                        </Route>
                        <Route path="/:id">
                            <Child />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function Child() {
    let { id } = useParams();
    return <ArticlePage name={id} />;
}
