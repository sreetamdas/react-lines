import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import LineElement from "./Line";
import { Line } from "react-progress-line";

class App extends React.Component {
	constructor() {
		super();

		this.handleMovement = this.handleMovement.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.generateNodePair = this.generateNodePair.bind(this);
		this.Nodes = this.Nodes.bind(this);
		this.Lines = this.Lines.bind(this);
		this.state = {
			active: false,
			show: false,
			message: null,
			first_node_in_line: false,
			nodes: [],
			coordinates: [],
			lines: []
		};
	}

	componentDidMount = () => {
		console.log("loaded");
	};
	// componentDidUpdate() {
	// 	console.log("lines:", this.state.lines);
	// }
	// separate handlers for initial and then drag
	handleMovement = (e, data) => {
		const id = data.node.firstChild.id;
		const el = document.getElementById(id);

		if (!el) {
			console.log("false");
			return false;
		}

		// const nodes = { ...this.state.nodes };
		// const index = nodes.indexOf(id);
		// console.log({index})
		// no longer required?
		// if (!this.state.nodes.includes(id)) {
		// 	console.log("include");
		// 	this.setState({
		// 		nodes: [...this.state.nodes, id]
		// 	});
		// }
		// console.log("here");
		// console.log({ el });
		const box = el.getBoundingClientRect();
		// console.log({ box });
		const x = box.left + box.width / 2;
		const y = box.bottom - box.height / 2;
		const index = this.state.nodes.indexOf(id);

		const updated_coordinates = [...this.state.coordinates];
		updated_coordinates[index] = [x, y];

		this.setState({
			coordinates: updated_coordinates
		});
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
					first_node_in_line: false,
					show: true
				},
				console.log("state:", this.state.lines)
			);
			console.log("removing listener");
			document.removeEventListener("click", this.handleClick);
			// this.Lines();
		}
		console.log("phase over");
	};

	generateNodePair = () => {
		console.log("generating");
		const first = Math.random()
				.toString(36)
				.substr(2, 6),
			second = Math.random()
				.toString(36)
				.substr(2, 6);

		console.log("gen: ", first, second);

		// const init = this.state.nodes.length > 1 ? false : true;
		this.setState({
			nodes: [...this.state.nodes, first, second],
			active: true
		});

		// this.insertNodePair(first, second);
	};

	insertNodePair = (first, second) => {
		console.log("inserting");
	};

	insertLine = () => {
		document.addEventListener("click", this.handleClick);
	};

	Nodes = () => {
		const nodes = this.state.nodes;
		console.log("nodes = ", { nodes });
		return (
			<React.Fragment>
				{nodes.map(
					node => (
						console.log("qwe"),
						(
							<Draggable onDrag={this.handleMovement} key={node}>
								<div className="shrink">
									<FontAwesomeIcon
										id={node}
										icon={faDesktop}
										size="3x"
										style={{ backgroundColor: "white" }}
									/>
								</div>
							</Draggable>
						)
					)
				)}
			</React.Fragment>
		);
	};

	Lines = () => {
		console.log("in lines");
		const coordinates = [...this.state.coordinates],
			lines = { ...this.state.lines },
			nodes = [...this.state.nodes];

		console.log({ lines }, "ty:", typeof lines);
		console.log(this.state.lines);

		if (typeof lines === "undefined" || lines === null || lines.length === null || lines.length === 0) {
			return null;
		}

		// Object.entries(lines).forEach(([src, dest]) => {
		// const src_coordinates = coordinates[`${nodes.indexOf(src)}`];
		// console.log(coordinates[`${nodes.indexOf(node)}`]),
		// 	console.log("asd"),
		// 	<p>tyutyu</p> ,
		const lines_keys = Object.keys(lines);
		const lines_values = Object.values(lines);

		console.log({ lines_keys }, { lines_values });
		return (
			<React.Fragment>
				{lines_keys.map((node, index) =>
					lines_values[index].map(
						dest => (
							console.log({ index }, { node }, { dest }, coordinates[`${nodes.indexOf(dest)}`]),
							(
								<Line
									key={dest}
									x0={coordinates[`${nodes.indexOf(node)}`][0]}
									y0={coordinates[`${nodes.indexOf(node)}`][1]}
									x1={coordinates[`${nodes.indexOf(dest)}`][0]}
									y1={coordinates[`${nodes.indexOf(dest)}`][1]}
									borderWidth={3}
									// borderColor="red"
									zIndex={-1}
								/>
							)
						)
					)
				)}
			</React.Fragment>
		);
		// dest.forEach(node => {
		// 	const dest_coordinates = coordinates[`${nodes.indexOf(node)}`];
		// 	return (
		// 		<Line
		// 			x0={src_coordinates[0]}
		// 			y0={src_coordinates[1]}
		// 			x1={dest_coordinates[0]}
		// 			y1={dest_coordinates[1]}
		// 			borderWidth={3}
		// 			zIndex={-1}
		// 		/>
		// 	);
		// });
		// });
		// for (let nodes in lines) {
		// 	console.log(nodes, typeof nodes);
		// }
	};

	render() {
		return (
			<div>
				<h1>This is App.</h1>
				<button onClick={this.generateNodePair}>New Pair</button>
				<button onClick={this.insertLine}>Draw Line</button>
				{this.state.message}
				<br />
				line follows:
				<br />
				<div>{this.state.show && this.Lines()}</div>
				<div>{this.state.active && this.Nodes()}</div>
			</div>
		);
	}
}

export default App;
