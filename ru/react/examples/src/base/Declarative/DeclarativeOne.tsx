import {useState} from 'react';
import {submitForm} from './utils';

export function DeclarativeOne() {
	const [answer, setAnswer] = useState('');
	const [error, setError] = useState<any>(null);
	const [status, setStatus] = useState('typing');

	if (status === 'success') {
		return <h1>Это правильно!</h1>;
	}

	async function handleSubmit(e: React.BaseSyntheticEvent) {
		e.preventDefault();
		setStatus('submitting');
		try {
			await submitForm(answer);
			setStatus('success');
		} catch (err: any) {
			setStatus('ввод');
			setError(err);
		}
	}

	function handleTextareaChange(e: React.BaseSyntheticEvent) {
		setAnswer(e.target.value);
	}

	return (
		<>
			<h2>Городская викторина</h2>
			<p>
				В каком городе есть рекламный щит, который превращает воздух в
				питьевую воду?
			</p>
			<form onSubmit={handleSubmit}>
				<textarea
					value={answer}
					onChange={handleTextareaChange}
					disabled={status === 'submitting'}
				/>
				<br />
				<button
					disabled={answer.length === 0 || status === 'submitting'}
				>
					Submit
				</button>
				{error !== null && <p className="Error">{error.message}</p>}
			</form>
		</>
	);
}
