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
            file_name: this.props.name + ".json",
            base_url: "https://pm25.github.io/my-articles/",
            meta_dir: "https://pm25.github.io/my-articles/index/meta/",
            sourceData: null,
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.state.meta_dir + this.state.file_name)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        sourceData: result,
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
                    <title> {this.state.sourceData.title} - PlusMore</title>
                </Helmet>,
                this.renderHeader(this.state.sourceData),
                this.renderArticleContent(this.state.sourceData),
            ];
        else if (this.state.error)
            return (
                <ShowMessage msg="[ something went wrong :( ] please refresh your page or check your link." />
            );
        else return <ShowMessage msg="Loading..." />;
    }

    renderHeader(state) {
        let created_date = state.created_date.split(" ");
        return <SimpleHeader title={state.title} date={created_date[0]} />;
    }

    renderArticleContent(state) {
        return <ArticleContent url={this.state.base_url + state.path} />;
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
                <div className="content article-content">
                    <ReactMarkdown
                        allowDangerousHtml={true}
                        linkTarget="_blank"
                        children={this.state.content}
                    />
                </div>
            );
        else if (this.state.error)
            return (
                <ShowMessage msg="[ something went wrong :( ] please refresh your page or check your link." />
            );
        else return <ShowMessage msg="Loading..." />;
    }
}

function ShowMessage(props) {
    return (
        <div className="content article-content">
            <h1>{props.msg}</h1>
        </div>
    );
}
