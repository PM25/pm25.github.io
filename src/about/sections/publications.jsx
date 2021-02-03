import React, { PureComponent } from "react";
import ReactHtmlParser from "react-html-parser";

import bib from "../source/publications.bib";

export default class PublicationsSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            publications: [],
        };
    }

    componentDidMount() {
        fetch(bib)
            .then((res) => res.text())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        publications: this.processingBibtex(result),
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

    processingBibtex(bibtex) {
        let bibtexJsons = this.parseBibtex(bibtex);
        for (let i = 0; i < bibtexJsons.length; ++i) {
            let authors = this.processing_authors(bibtexJsons[i].author);
            if (authors.length >= 2) {
                authors[authors.length - 2] =
                    authors[authors.length - 2] +
                    " and " +
                    authors[authors.length - 1];
                authors.pop();
            }
            bibtexJsons[i].author = authors.join(", ");

            if (bibtexJsons[i].pages) {
                bibtexJsons[i].pages = bibtexJsons[i].pages.replace("--", "-");
            }
        }
        return bibtexJsons;
    }

    parseBibtex(bibtex) {
        let bibjson = bibtex
            .replace(/(\w+)\s*=\s*\{/g, '"$1": "')
            .replace(/\}(?=\s*[,\}])/g, '"')
            .replace(/@(\w+)\s*\{([^,]*)/g, ',{"$1": "$2"');
        // remove first ',' and turn it into a list
        bibjson = "[" + bibjson.substring(1) + "]";
        let bibobj = JSON.parse(bibjson);
        return bibobj;
    }

    // processing authors name and make my name bold
    processing_authors(authorStr) {
        let authors = [];
        authorStr.split("and").forEach((author) => {
            let name = author.split(",");
            if (name.length > 1) {
                let first_name = name[1].trim(),
                    last_name = name[0].trim();
                name = first_name + " " + last_name;
            }
            if (name === "Pin-Yen Huang") name = "<b>" + name + "</b>";
            authors.push(name);
        });
        return authors;
    }

    render() {
        return (
            <div className="section" id="publications">
                <h2 className="header">Publications</h2>
                <div className="content">
                    {this.state.publications.map((state, key) => {
                        if (state.article) {
                            return this.renderArticleBlock(state, ++key);
                        } else if (state.inproceedings) {
                            return this.renderInproceedingsBlock(state, ++key);
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        );
    }

    renderInproceedingsBlock(state, key) {
        return (
            <InproceedingsBlock
                index={key}
                title={state.title}
                author={state.author}
                booktitle={state.booktitle}
                pages={state.pages}
                year={state.year}
                organization={state.organization}
                url={state.url}
            ></InproceedingsBlock>
        );
    }

    renderArticleBlock(state, key) {
        return (
            <ArticleBlock
                index={key}
                title={state.title}
                author={state.author}
                journal={state.journal}
                volume={state.volume}
                pages={state.pages}
                year={state.year}
                publisher={state.publisher}
                url={state.url}
            ></ArticleBlock>
        );
    }
}

function InproceedingsBlock(props) {
    return (
        <a href={props.url} target="_blank" rel="noreferrer">
            [{props.index}] {ReactHtmlParser(props.author)}, "{props.title}"
            {props.booktitle ? ", " : ""}
            {props.booktitle ? <i>{props.booktitle}</i> : ""}
            {props.year ? ", " + props.year : ""}
            {props.volume ? ", vol. " + props.volume : ""}
            {props.number ? ", no. " + props.number : ""}
            {props.pages ? ", pp. " + props.pages : ""}
        </a>
    );
}

function ArticleBlock(props) {
    return (
        <a href={props.url} target="_blank" rel="noreferrer">
            [{props.index}] {ReactHtmlParser(props.author)}, "{props.title}"
            {props.journal ? ", " : ""}
            {props.journal ? <i>{props.journal}</i> : ""}
            {props.year ? ", " + props.year : ""}
            {props.volume ? ", vol. " + props.volume : ""}
            {props.number ? ", no. " + props.number : ""}
            {props.pages ? ", pp. " + props.pages : ""}
        </a>
    );
}
