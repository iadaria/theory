export function createConnection(serverUrl: string, roomId: string) {
	// A real implementation would actually connect to the server
	let connectedCallback: () => void;
	let timeout: NodeJS.Timeout;
	return {
		connect() {
			timeout = setTimeout(() => {
				if (connectedCallback) {
					connectedCallback();
				}
			}, 100);
		},
		on(event: string, callback: () => void) {
			if (!!connectedCallback) {
				throw Error('Cannot add the handler twice.');
			}
			if (event !== 'connected') {
				throw Error('Only "connected" event is supported.');
			}
			connectedCallback = callback;
		},
		disconnect() {
			clearTimeout(timeout);
		},
	};
}
