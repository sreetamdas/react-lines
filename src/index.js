import React from "react";
import ReactLines from "./App";
import { render } from "react-dom";

const Root = () => {
	return <ReactLines />;
};

render(<Root />, document.getElementById("root"));
