import React, { PureComponent } from "react";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

import SimpleHeader from "./simpleheader.jsx";

ReactGA.initialize("UA-129342449-2");

export default class ArticlePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            base: "https://pm25.github.io/my-articles/",
            source: "https://pm25.github.io/my-articles/dict.json",
            sourceData: null,
            error: null,
            isLoaded: false,
            title: null,
        };
    }

    componentDidMount() {
        let title = this.props.name.replaceAll("-", " ");
        this.setState({ title: title });
        fetch(this.state.source)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        sourceData: result[title],
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
        if (this.state.isLoaded && this.state.error == null)
            return [
                <Helmet>
                    <title> {this.state.title} - PlusMore</title>
                </Helmet>,
                this.renderHeader(this.state.sourceData),
                this.renderArticleContent(this.state.sourceData),
            ];
        else return <div></div>;
    }

    renderHeader(state) {
        return <SimpleHeader title={state.name} date={state.date} />;
    }

    renderArticleContent(state) {
        return <ArticleContent url={this.state.base + state.path} />;
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
