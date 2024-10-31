import {useEffect, useState} from 'react';

export function Clock() {
	const [date, setDate] = useState(new Date());

	function tick() {
		setDate(new Date());
	}

	useEffect(() => {
		let timerId = setInterval(tick, 1000);
		return () => clearInterval(timerId);
	}, []);

	return (
		<div>
			<h1>Привет, мир!</h1>
			<h2>Сейчас {date.toLocaleTimeString()}.</h2>
			<input />
		</div>
	);
}
