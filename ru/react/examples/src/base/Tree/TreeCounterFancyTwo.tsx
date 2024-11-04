import {useState} from 'react';

export function TreeCounterFancyTwo() {
	const [isFancy, setIsFancy] = useState(false);

	console.log('[TreeCounterFancyTwo] render');

	if (isFancy) {
		return (
			<div>
				<Counter isFancy={true} />
				<br />
				<label>
					<input
						type="checkbox"
						checked={isFancy}
						onChange={(e) => {
							setIsFancy(e.target.checked);
						}}
					/>
					Use fancy styling
				</label>
			</div>
		);
	}
	return (
		<div>
			<Counter isFancy={false} />
			<br />
			<label>
				<input
					type="checkbox"
					checked={isFancy}
					onChange={(e) => {
						setIsFancy(e.target.checked);
					}}
				/>
				Use fancy styling
			</label>
		</div>
	);
}

function Counter({isFancy}: {isFancy: boolean}) {
	const [score, setScore] = useState(0);

	console.log('[Counter] render');

	let style;
	if (isFancy) {
		style = {color: 'red'};
	}

	return (
		<div style={style}>
			<h1>{score}</h1>
			<button onClick={() => setScore(score + 1)}>Add one</button>
		</div>
	);
}
