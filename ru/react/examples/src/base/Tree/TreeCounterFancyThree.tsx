import {useState} from 'react';

export function TreeCounterFancyThree() {
	const [isFancy, setIsFancy] = useState(false);
	return (
		<div>
			{isFancy ? (
				<div>
					<Counter isFancy={true} />
				</div>
			) : (
				<section>
					<Counter isFancy={false} />
				</section>
			)}
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
