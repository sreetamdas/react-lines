import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import LineElement from "./Line";
import { Line } from "react-lineto";

class App extends React.Component {
	constructor() {
		super();

		this.handleMovement = this.handleMovement.bind(this);
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

	componentDidMount = () => {
		console.log("loaded");
	};
	// separate handlers for initial and then drag
	handleMovement = (e, data, initial) => {
		// console.log({ data });
		// console.log("id:", data.node.firstChild.id);
		// let id = data.node.firstChild.id;

		// initial ? (id = initial) : (id = data.node.firstChild.id);
		const id = initial ? initial : data.node.firstChild.id;
		console.log({ id });
		const el = document.getElementById(id);
		// el.classList.add("yellow");
		// console.log(id, el.className);
		console.log({ el });

		if (!el) {
			console.log("false");
			return false;
		}
		// no longer required?
		if (!this.state.nodes.includes(id)) {
			console.log("include");
			this.setState({
				nodes: [...this.state.nodes, id]
			});
		}
		console.log("here");
		const box = el.getBoundingClientRect();
		console.log({ box });
		const x = box.left + box.width / 2;
		const y = box.bottom - box.height / 2;
		const index = this.state.nodes.indexOf(id);

		this.setState({
			[`x${index}`]: x,
			[`y${index}`]: y
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

		// const init = this.state.nodes.length > 1 ? false : true;
		this.setState({
			nodes: [...this.state.nodes, first, second],
			active: true
		});

		this.handleMovement(null, null, first);
		this.handleMovement(null, null, second);
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
					<Draggable onDrag={this.handleMovement}>
						<div>
							<FontAwesomeIcon id={node} key={node} icon={faDesktop} size="3x" style={{ backgroundColor: "white" }} />
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
				<button onClick={this.insertNodePair}>New Pair</button>
				<button onClick={this.insertLine}>Draw Line</button>
				{this.state.message}
				<br />
				line follows:
				<br />
				{this.state.active && (
					<Line x0={this.state.x0} y0={this.state.y0} x1={this.state.x1} y1={this.state.y1} borderWidth={3} zIndex={-1} />
				)}
				<div>{this.state.active && this.Nodes()}</div>
			</div>
		);
	}
}

export default App;
