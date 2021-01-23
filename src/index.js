import React from "react";
import ReactDOM from "react-dom";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";

import "./index.css";
import Header from "./section/header.jsx";
import Content from "./section/content.jsx";
// import Article from "./section/article.jsx";

ReactDOM.render(
    <React.StrictMode>
        <Navigator />
        <Header />
        <Content />
        <Footer />
    </React.StrictMode>,
    document.getElementById("root")
);
