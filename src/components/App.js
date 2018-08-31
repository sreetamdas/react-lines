import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import LineElement from "./Line";
import { Line } from "react-lineto";

class App extends React.Component {
	constructor() {
		super();

		this.position = this.position.bind(this);
		this.state = {
			coordinates: null,
			x1: null,
			y1: null,
			x0: null,
			y0: null,
			active: false,
			nodes: [],
		};
	}
	position = (e, data) => {
		console.log("id:", data.node.id);
		const id = data.node.id;
		const el = document.getElementById(data.node.id);
		if (!el) {
			return false;
		}

		if (!this.state.nodes.includes(id)) {
			this.setState({
				nodes: [...this.state.nodes, id],
			});
		}
		const box = el.getBoundingClientRect();
		console.log({ box });
		const x1 = box.left + 25;
		const y1 = box.bottom - 25;
		const index = this.state.nodes.indexOf(id);

		this.setState({
			[`x${index}`]: x1,
			[`y${index}`]: y1,
		});
		if (this.state.x0 && this.state.x1) {
			this.setState({
				active: true,
			});
		}
	};
	render() {
		return (
			<div>
				<h1>This is App.</h1>
				<Draggable onDrag={this.position}>
					<div id="E1">
						<FontAwesomeIcon icon={faDesktop} size="3x" />
					</div>
				</Draggable>
				<h1>iuhweifubwiefciuweciuwefcuwbfciwefcwefc</h1>
				<Draggable onDrag={this.position}>
					<div id="E2">
						<FontAwesomeIcon icon={faDesktop} size="3x" />
					</div>
				</Draggable>
				line follows:
				{this.state.active && (
					<Line
						x0={this.state.x0}
						y0={this.state.y0}
						x1={this.state.x1}
						y1={this.state.y1}
						borderWidth={3}
						zIndex={-1}
					/>
				)}
			</div>
		);
	}
}

export default App;
