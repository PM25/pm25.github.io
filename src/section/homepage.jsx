import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import Header from "./header.jsx";

ReactGA.initialize("UA-129342449-2");

export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            source: "https://pm25.github.io/my-articles/list.json",
            articles: null,
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.state.source)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        articles: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        if (this.state.isLoaded) {
            return [
                <Header />,
                <div className="content">
                    {this.state.articles.map((state, key) => {
                        return (
                            <ArticleBlock
                                id={key}
                                name={state.name}
                                date={state.date}
                                url={state.name.replaceAll(" ", "-")}
                                preview={state.preview}
                            />
                        );
                    })}
                </div>,
            ];
        } else {
            return <div className="content"></div>;
        }
    }
}

function ArticleBlock(props) {
    return (
        <div key={props.id} className="article-block">
            <Link to={"/article/" + props.url}>
                <div className="title-date">
                    <span className="title"> {props.name} </span>
                    <span className="date">{props.date}</span>
                </div>
                <div className="preview"> {props.preview} </div>
            </Link>
        </div>
    );
}
