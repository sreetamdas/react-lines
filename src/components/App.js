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
		this.handleClick = this.handleClick.bind(this);
		this.Nodes = this.Nodes.bind(this);
		this.state = {
			coordinates: null,
			x1: null,
			y1: null,
			x0: null,
			y0: null,
			active: false,
			message: null,
			first_node_in_line: 0,
			nodes: [],
			lines: [],
			new: []
		};
	}

	componentDidMount = () => {
		console.log("loaded");
	};
	componentDidUpdate() {
		console.log("lines:", this.state.lines);
	}
	// separate handlers for initial and then drag
	handleMovement = (e, data, initial) => {
		const id = initial ? initial : data.node.firstChild.id;
		const el = document.getElementById(id);

		if (!el) {
			console.log("false");
			return false;
		}
		// no longer required?
		// if (!this.state.nodes.includes(id)) {
		// 	console.log("include");
		// 	this.setState({
		// 		nodes: [...this.state.nodes, id]
		// 	});
		// }
		console.log("here");
		console.log({ el });
		const box = el.getBoundingClientRect();
		// console.log({ box });
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
		// console.log({ e });
		console.log("target:", e.target.id);

		const node = e.target.id;

		if (!this.state.first_node_in_line) {
			console.log("here1");
			const connections = { ...this.state.lines };
			// console.log("first", { connections });
			// connections = [...connections, node];
			if (
				typeof connections[`${node}`] === "undefined" ||
				connections[`${node}`] === null ||
				connections[`${node}`].length === null ||
				connections[`${node}`].length === 0
			) {
				connections[`${node}`] = [];
			}
			console.log("second", { connections });
			this.setState(
				{
					message: "click the next one",
					first_node_in_line: node,
					lines: connections
				},
				console.log("set1")
			);
			console.log("completed1");
		} else {
			console.log("here2");
			const connections = { ...this.state.lines };
			console.log({ connections });
			connections[`${this.state.first_node_in_line}`].push(node);
			console.log("updated:", { connections });

			this.setState(
				{
					message: "done",
					lines: connections,
					first_node_in_line: false
				},
				console.log("state:", this.state.lines)
			);
			console.log("removing listener");
			document.removeEventListener("click", this.handleClick);
		}
		console.log("phase over");
	};

	insertNodePair = () => {
		console.log("node called");
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
		document.addEventListener("click", this.handleClick);
	};

	Nodes = () => {
		const nodes = this.state.nodes;
		console.log("nodes = ", { nodes });
		return (
			<React.Fragment>
				{nodes.map(node => (
					<Draggable onDrag={this.handleMovement}>
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
				<button onClick={this.insertNodePair}>New Pair</button>
				<button onClick={this.insertLine}>Draw Line</button>
				{this.state.message}
				<br />
				line follows:
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
