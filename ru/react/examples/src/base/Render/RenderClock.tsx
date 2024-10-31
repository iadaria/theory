export function RenderClock({time}: {time: Date}) {
	return (
		<>
			<h1>{time.toString()}</h1>
			<input />
		</>
	);
}
