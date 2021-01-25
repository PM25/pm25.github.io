import React, { PureComponent } from "react";
import ReactMarkdown from "react-markdown";
import SimpleHeader from "./simpleheader.jsx";

export default class Article extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            source: "https://pm25.github.io/my-articles/dict.json",
            sourceData: null,
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.state.source)
            .then((res) => res.json())
            .then(
                (result) => {
                    let key = this.props.name.replaceAll("-", " ");
                    this.setState({
                        isLoaded: true,
                        sourceData: result[key],
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
        if (this.state.isLoaded && this.state.error == null)
            return (
                <div>
                    {this.renderHeader(this.state.sourceData)}
                    {this.renderArticleContent(this.state.sourceData)}
                </div>
            );
        else return <div></div>;
    }

    renderHeader(state) {
        return <SimpleHeader title={state.name} date={state.date} />;
    }

    renderArticleContent(state) {
        return (
            <ArticleContent
                url={"https://pm25.github.io/my-articles/" + state.path}
            />
        );
    }
}

class ArticleContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            content: null,
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.state.url)
            .then((res) => res.text())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        content: result,
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
        if (this.state.isLoaded && this.state.error == null)
            return (
                <div className="content article">
                    <ReactMarkdown
                        allowDangerousHtml={true}
                        linkTarget="_blank"
                        children={this.state.content}
                    />
                </div>
            );
        else return <div className="content article"></div>;
    }
}
