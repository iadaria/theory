import {useEffect, useState} from 'react';

function createConnection({roomId}: {roomId: string}) {
	// A real implementation would actually connect to the server
	return {
		connect() {
			console.log(`✅ Connecting...'${roomId}'`);
		},
		disconnect() {
			console.log(`❌ Disconnected: '${roomId}'`);
		},
	};
}

function ChatRoom({roomId}: {roomId: string}) {
	useEffect(() => {
		console.log(
			ChatRoom.name,
			`randomId: '${roomId}'`,
			'[useEffect] called'
		);
		const connection = createConnection({roomId});
		connection.connect();
		return () => connection.disconnect();
	}, [roomId]);

	return <h1>Welcome to {roomId}!</h1>;
}

export function EffectConnection() {
	const [roomId, setRoomId] = useState('general');

	useEffect(() => {
		const timeId = setInterval(() => {
			setRoomId('general');
			//setRoomId(Math.random().toString(36).slice(2, 7));
		}, 5000);

		return () => clearInterval(timeId);
	}, []);

	return <ChatRoom roomId={roomId} />;
}
