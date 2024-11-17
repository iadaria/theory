import {useEffect, useState, useSyncExternalStore} from 'react';
/* the first method */
function useOnlineStatus() {
	// Not ideal: Manual store subscription in an Effect
	const [isOnline, setIsOnline] = useState(true);
	useEffect(() => {
		function updateState() {
			setIsOnline(navigator.onLine);
		}

		updateState();

		window.addEventListener('online', updateState);
		window.addEventListener('offline', updateState);
		return () => {
			window.removeEventListener('online', updateState);
			window.removeEventListener('offline', updateState);
		};
	}, []);
	return isOnline;
}

/** the second method */
function subscribe(callback: any) {
	window.addEventListener('online', callback);
	window.addEventListener('offline', callback);
	return () => {
		window.removeEventListener('online', callback);
		window.removeEventListener('offline', callback);
	};
}

function useOnlineStatusTwo() {
	// ✅ Good: Subscribing to an external store with a built-in Hook
	return useSyncExternalStore(
		subscribe, // React won't resubscribe for as long as you pass
		// the same function
		() => navigator.onLine, // How to get the value on the client
		() => true // How to get the value on the server
	);
}

export function EffectOnlineStatus() {
	const isOnline = useOnlineStatus();
	const isOnlineTwo = useOnlineStatusTwo();
	return (
		<div>
			<p>It is {isOnline ? '✅ Online' : '❌ Disconnected'}</p>
			<p>Two is {isOnlineTwo ? '✅ Online' : '❌ Disconnected'}</p>
		</div>
	);
}
