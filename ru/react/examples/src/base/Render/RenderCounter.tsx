import {useState} from 'react';

export function RenderCounter() {
	const [number, setNumber] = useState(0);

	return (
		<>
			<h1>{number}</h1>
			<button
				onClick={() => {
					setNumber(number + 1);
					setNumber(number + 1);
					setNumber(number + 1);
					alert(number);
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
