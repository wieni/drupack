import "./index.scss";

import "react-hot-loader";
import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader/root";

const App = () => <div>Hello there space!</div>;

const HotApp = hot(App);

render(<HotApp />, document.getElementById("app"));
