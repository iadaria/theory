import {useRef, useState} from 'react';

export function ReferenceStopWatch() {
	const [startTime, setStartTime] = useState(Date.now());
	const [now, setNow] = useState(Date.now());
	const intervalRef = useRef<NodeJS.Timer | null>(null);

	function handleStart() {
		// Start counting.
		setStartTime(Date.now());
		setNow(Date.now());
		clear();
		intervalRef.current = setInterval(() => {
			// Update the current time every 10ms.
			setNow(Date.now());
		}, 10);
	}

	function clear() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	}

	function handleStop() {
		clear();
	}

	let secondsPassed = 0;
	if (startTime != null && now != null) {
		secondsPassed = (now - startTime) / 1000;
	}

	return (
		<>
			<h1>Time passed: {secondsPassed.toFixed(3)}</h1>
			<button onClick={handleStart}>Start</button>
			<button onClick={handleStop}>Stop</button>
		</>
	);
}
