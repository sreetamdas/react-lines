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
		this.allLines = this.allLines.bind(this);
		this.Nodes = this.Nodes.bind(this);
		this.state = {
			coordinates: null,
			x1: null,
			y1: null,
			x0: null,
			y0: null,
			active: false,
			message: null,
			nodes: [],
			lines: []
		};
	}
	position = (e, data) => {
		// console.log({ data });
		// console.log("id:", data.node.firstChild.id);
		const id = data.node.firstChild.id;
		const el = document.getElementById(id);
		// el.classList.add("yellow");
		// console.log(id, el.className);

		if (!el) {
			return false;
		}

		if (!this.state.nodes.includes(id)) {
			this.setState({
				nodes: [...this.state.nodes, id]
			});
		}
		const box = el.getBoundingClientRect();
		console.log({ box });
		const x1 = box.left + box.width / 2;
		const y1 = box.bottom - box.height / 2;
		const index = this.state.nodes.indexOf(id);

		this.setState({
			[`x${index}`]: x1,
			[`y${index}`]: y1
		});
		if (this.state.x0 && this.state.x1) {
			this.setState({
				active: true
			});
		}
	};

	handleClick = e => {
		console.log({ e });
		this.setState({
			message: "click the next one"
		});
		document.removeEventListener("click", this.handleClick);
	};

	// newLine = () => {
	// };

	// newPair = () => {
	// 	this.setState({
	// 		nodes
	// 	});
	// };

	allLines = () => {
		// for()
	};

	insertNodePair = () => {
		const first = Math.random()
				.toString(36)
				.substring(7),
			second = Math.random()
				.toString(36)
				.substring(7);

		// console.log({ first }, { second });
		this.setState({
			nodes: [...this.state.nodes, first, second],
			active: true
		});
	};

	insertLine = () => {
		document.addEventListener("click", this.handleClick, false);
	};

	Nodes = () => {
		const nodes = this.state.nodes;
		console.log({ nodes });
		// this.setState({
		// 	active: true
		// })
		return (
			<React.Fragment>
				{nodes.map(node => (
					<Draggable>
						<div>
							<FontAwesomeIcon
								id={node}
								key={node}
								icon={faDesktop}
								size="3x"
								style={{ backgroundColor: "white" }}
							/>
						</div>
					</Draggable>
				))}
			</React.Fragment>
		);
	};

	Lines = () => {};
	render() {
		return (
			<div>
				<h1>This is App.</h1>
				{/*<Draggable onDrag={this.position}>
					<div>
						<FontAwesomeIcon id="E1" icon={faDesktop} size="3x" style={{ backgroundColor: "white" }} />
					</div>
				</Draggable>
				<h1>iuhweifubwiefciuweciuwefcuwbfciwefcwefc</h1>
				<Draggable onDrag={this.position}>
					<div>
						<FontAwesomeIcon id="E2" icon={faDesktop} size="3x" />
					</div>
				</Draggable>
				{/*<Draggable onDrag={this.position}>
					<div>
						<FontAwesomeIcon id="E3" icon={faDesktop} size="3x" />
					</div>
				</Draggable>
				<h1>iuhweifubwiefciuweciuwefcuwbfciwefcwefc</h1>
				<Draggable onDrag={this.position}>
					<div>
						<FontAwesomeIcon id="E4" icon={faDesktop} size="3x" />
					</div>
				</Draggable> */}
				<button onClick={this.insertNodePair}>New Pair</button>
				<button onClick={this.insertLine}>Draw Line</button>
				{this.state.message}
				<br />
				line followssssssss:
				<br />
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
				<div>{this.state.active && this.Nodes()}</div>
			</div>
		);
	}
}

export default App;
