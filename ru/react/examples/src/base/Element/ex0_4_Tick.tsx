import {createRoot} from 'react-dom/client';

function ex0_4_Tick() {
	const element = (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);

	const tickNode = document.getElementById('tick');

	const tickRoot = createRoot(tickNode!);
	tickRoot.render(element);
}

export function ShowTickButton() {
	return (
		<>
			<div id="tick" />
			<button
				onClick={() => {
					setInterval(ex0_4_Tick, 1000);
				}}
			>
				Show Tick
			</button>
		</>
	);
}
