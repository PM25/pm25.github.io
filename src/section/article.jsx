import React, { PureComponent } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default class Article extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: "https://pm25.github.io/my-articles/" + this.props.path,
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
        return (
            <div className="content article">
                <ReactMarkdown
                    plugins={[gfm]}
                    allowDangerousHtml={true}
                    linkTarget="_blank"
                    children={this.state.content}
                />
            </div>
        );
    }
}
