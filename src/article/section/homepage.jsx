import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./header.jsx";

export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            file_name: "list_0.json",
            list_dir:
                "https://pm25.github.io/my-articles/index/" +
                this.props.category +
                "/",
            articles: null,
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.state.list_dir + this.state.file_name)
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
    }

    render() {
        if (this.state.isLoaded && this.state.error == null) {
            return [
                <Helmet>
                    <title>Article - PlusMore</title>
                </Helmet>,
                <Header />,
                <div className="content home-content">
                    {this.state.articles.map((state, key) => {
                        return (
                            <ArticleBlock
                                id={key}
                                name={state.name}
                                date={state.created_date}
                                url={state.name.replaceAll(" ", "-")}
                                preview={state.preview}
                            />
                        );
                    })}
                </div>,
            ];
        } else if (this.state.error) {
            return (
                <ShowMessage msg="[ something went wrong :( ] please refresh your page or check your link." />
            );
        } else {
            return <ShowMessage msg="Loading..." />;
        }
    }
}

function ArticleBlock(props) {
    return (
        <div key={props.id} className="article-block">
            <Link to={"/article/content/" + props.url}>
                <div className="title-date">
                    <span className="title"> {props.name} </span>
                    <span className="date">{props.date}</span>
                </div>
                <div className="preview"> {props.preview} </div>
            </Link>
        </div>
    );
}

function ShowMessage(props) {
    return (
        <div className="content article-content">
            <h1>{props.msg}</h1>
        </div>
    );
}
