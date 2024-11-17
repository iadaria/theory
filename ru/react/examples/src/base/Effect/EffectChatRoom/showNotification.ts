import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {Theme} from './index';

export function showNotification(message: string, theme: Theme) {
	Toastify({
		text: message,
		duration: 800,
		gravity: 'top',
		position: 'right',
		style: {
			background: theme === 'dark' ? 'black' : 'white',
			color: theme === 'dark' ? 'white' : 'black',
		},
	}).showToast();
}
