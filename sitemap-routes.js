import React from "react";
import { Route } from "react-router";

export default (
    <Route>
        <Route path="/home" />
        <Route path="/project" />
        <Route path="/article" />
        <Route path="/#/article/:id" />
        <Route path="/:path" />
    </Route>
);
