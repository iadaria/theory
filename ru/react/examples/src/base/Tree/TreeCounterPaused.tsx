import {useState} from 'react';

export function TreeCounterPaused() {
	const [isPaused, setIsPaused] = useState(false);
	return (
		<div>
			{isPaused ? <p>See you later!</p> : <Counter />}
			<br />
			<label>
				<input
					type="checkbox"
					checked={isPaused}
					onChange={(e) => {
						setIsPaused(e.target.checked);
					}}
				/>
				Take a break
			</label>
		</div>
	);
}

function Counter() {
	const [score, setScore] = useState(0);

	return (
		<div>
			<h1>{score}</h1>
			<button onClick={() => setScore(score + 1)}>Add one</button>
		</div>
	);
}
