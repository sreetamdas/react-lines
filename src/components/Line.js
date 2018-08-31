import React from "react";
import { Line } from "react-lineto";

class LineElement extends React.Component {
	render() {
		return (
			<div>
				<div className="A">Element A</div>
				<div className="C">.</div>
				<div className="D">.</div>
				<div className="E">.</div>
				<div className="F">.</div>
				<div className="G">.</div>
				<div className="H">.</div>
				<div className="B">Element B</div>
				<Line x1={30} y1={30} x0={98} y0={109} borderWidth={8} />
			</div>
		);
	}
}

export default LineElement;
