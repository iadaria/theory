import {useState} from 'react';

export function RenderCounterWithUpdater() {
	const [number, setNumber] = useState(0);
	console.log(
		RenderCounterWithUpdater.name,
		'render',
		'number = ',
		number
	);
	return (
		<>
			<h1>{number}</h1>
			<button
				onClick={() => {
					setNumber((n: number) => n + 1);
					setNumber((n: number) => n + 1);
					setNumber((n: number) => n + 1);
					console.log('[onClick] number: ', number);
					setTimeout(() => {
						alert(number);
					}, 3000);
				}}
			>
				+3
			</button>
		</>
	);
}
