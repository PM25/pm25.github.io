import React from "react";
import ReactDOM from "react-dom";
import Navigator from "./components/src/navigator";
import Footer from "./components/src/footer";
import App from "./app";

ReactDOM.render(
    <React.StrictMode>
        <Navigator />
        <App />
        <Footer />
    </React.StrictMode>,
    document.getElementById("root")
);
