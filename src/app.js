import React, { PureComponent } from "react";
import "./app.css";
import Content from "./section/content.jsx";
import Article from "./section/article.jsx";
import {
    HashRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

export default class App extends PureComponent {
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
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Content setHeader={this.setHeader} />
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
    return <Article name={id} />;
}
