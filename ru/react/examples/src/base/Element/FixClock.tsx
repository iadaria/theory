export default function FixClock({time}: {time: Date}) {
	let hours = time.getHours();
	let timeId = document.getElementById('time');
	if (timeId) {
		if (hours >= 0 && hours <= 6) {
			timeId.className = 'night';
		} else {
			timeId.className = 'day';
		}
	}
    const className = hours >= 0 && hours <= 6 ? 'night' : 'day';
	return (
		<h1 id="time" className={className}>
			{time.toLocaleTimeString()}
		</h1>
	);
}
