import React, { PureComponent } from "react";

export default class Content extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            source: "https://pm25.github.io/my-articles/list.json",
            base_url: null,
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
                        articles: result.articles,
                        base_url: result.base_url,
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
        if (this.state.isLoaded) {
            return (
                <div className="content">
                    {this.state.articles.map((state, key) => {
                        return (
                            <ArticleBlock
                                id={key}
                                date={state.date}
                                name={state.name}
                                preview={state.preview}
                            />
                        );
                    })}
                </div>
            );
        } else {
            return <div className="content"></div>;
        }
    }
}

function ArticleBlock(props) {
    return (
        <div key={props.id} className="article-block">
            <div>
                <span className="name"> {props.name} </span>
                <span className="date">{props.date}</span>
            </div>
            <div className="preview"> {props.preview} </div>
        </div>
    );
}
