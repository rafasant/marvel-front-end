import React from "react";
import Home from '../components/home'

import { BrowserRouter, Route } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
        </BrowserRouter>
    )
}