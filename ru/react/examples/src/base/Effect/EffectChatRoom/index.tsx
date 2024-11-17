import {useState, useEffect} from 'react';
/// <reference types="react/experimental" />
import {experimental_useEffectEvent as useEffectEvent} from 'react';
import {showNotification} from './showNotification';
import {createConnection} from './createConnection';

export type Theme = 'dark' | 'light';

const serverUrl = 'https://localhost:1234';

function ChatRoomReactive({
	roomId,
	theme,
}: {
	roomId: string;
	theme: Theme;
}) {
	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.on('connected', () => {
			showNotification('Connected!', theme);
		});
		connection.connect();
		return () => connection.disconnect();
	}, [roomId, theme]);

	return <h1>Welcome to the {roomId} room!</h1>;
}

function ChatRoom({roomId, theme}: {roomId: string; theme: Theme}) {
	const onConnected = useEffectEvent(() => {
		showNotification('Connected!', theme);
	});

	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.on('connected', () => {
			onConnected();
		});
		connection.connect();
		return () => connection.disconnect();
	}, [roomId]);

	return <h1>Welcome to the {roomId} room!</h1>;
}

export function EffectChatRoom() {
	const [roomId, setRoomId] = useState('general');
	const [isDark, setIsDark] = useState(false);
	return (
		<>
			<label>
				Choose the chat room:{' '}
				<select
					value={roomId}
					onChange={(e) => setRoomId(e.target.value)}
				>
					<option value="general">general</option>
					<option value="travel">travel</option>
					<option value="music">music</option>
				</select>
			</label>
			<label>
				<input
					type="checkbox"
					checked={isDark}
					onChange={(e) => setIsDark(e.target.checked)}
				/>
				Use dark theme
			</label>
			<hr />
			<ChatRoom roomId={roomId} theme={isDark ? 'dark' : 'light'} />
		</>
	);
}
