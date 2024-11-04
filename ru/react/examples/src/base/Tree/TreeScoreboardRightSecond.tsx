import {useState} from 'react';

export function TreeScoreboardRightSecond() {
	const [isPlayerA, setIsPlayerA] = useState(true);
	return (
		<div>
			{isPlayerA ? (
				<Counter key="Taylor" person="Taylor" />
			) : (
				<Counter key="Sarah" person="Sarah" />
			)}
			<button
				onClick={() => {
					setIsPlayerA(!isPlayerA);
				}}
			>
				Next player!
			</button>
		</div>
	);
}

function Counter({person}: {person: string}) {
	const [score, setScore] = useState(0);

	return (
		<div>
			<h1>
				{person}'s score: {score}
			</h1>
			<button onClick={() => setScore(score + 1)}>Add one</button>
		</div>
	);
}
