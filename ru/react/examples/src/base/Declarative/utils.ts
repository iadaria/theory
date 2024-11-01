export function submitForm(answer: string): Promise<void> {
	// Pretend it's hitting the network.
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let shouldError = answer.toLowerCase() !== 'lima';
			if (shouldError) {
				reject(
					new Error('Good guess but a wrong answer. Try again!')
				);
			} else {
				resolve();
			}
		}, 1500);
	});
}
