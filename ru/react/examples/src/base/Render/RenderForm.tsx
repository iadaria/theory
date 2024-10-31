import {useState} from 'react';

export function RenderForm() {
	const [isSent, setIsSent] = useState(false);
	const [message, setMessage] = useState('Hi!');

	console.log('[RenderForm] render, isSent=' + isSent);

	if (isSent) {
		return <h1>Your message is on its way!</h1>;
	}
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setIsSent(true);
				console.log('[onSubmit] isSent=' + isSent);
				sendMessage(message);
			}}
		>
			<textarea
				placeholder="Message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button type="submit">Send</button>
		</form>
	);
}

function sendMessage(message: string) {
	console.log('sent a message: ' + message);
}
