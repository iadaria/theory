import {useRef, useState} from 'react';

export function Example1() {
	// const [count, setCount] = useState(0);

	let someNumber = 0;

	let someRef = useRef(0);

	console.log({someNumber, ref: someRef.current});

	const incrementCount = () => {
		// setCount(prev => prev+1);
		someNumber = someNumber + 1;
		someRef.current = someRef.current + 1;
		console.log('[button event]', {someNumber, ref: someRef.current});
	};

	return (
		<div className="App">
			{/* <h1>Count: {count}</h1> */}
			<h2>Number: {someNumber}</h2>
			<h3>Ref: {someRef.current}</h3>
			<button onClick={incrementCount}>Increment count</button>
		</div>
	);
}

export function Example2() {
	const [text, setText] = useState('');

	let someNumber = useRef(0);

	someNumber.current++;

	return (
		<div className="App">
			Rendered {someNumber.current} times
			<input
				onChange={(e) => {
					setText(e.target.value);
				}}
				value={text}
			></input>
		</div>
	);
}
