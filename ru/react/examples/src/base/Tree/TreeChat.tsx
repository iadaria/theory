import {useState} from 'react';

type Contact = {id: number; name: string; email: string};

const contacts: Contact[] = [
	{id: 0, name: 'Taylor', email: 'taylor@mail.com'},
	{id: 1, name: 'Alice', email: 'alice@mail.com'},
	{id: 2, name: 'Bob', email: 'bob@mail.com'},
];

export function TreeChat() {
	const [to, setTo] = useState(contacts[0]);
	return (
		<div>
			<ContactList
				contacts={contacts}
				selectedContact={to}
				onSelect={(contact: Contact) => setTo(contact)}
			/>
			<Chat contact={to} />
		</div>
	);
}

export function ContactList({contacts, onSelect}: any) {
	const contactList = contacts.map((contact: Contact) => (
		<li key={contact.id}>
			<button onClick={() => onSelect(contact)}>
				{contact.name}
			</button>
		</li>
	));

	return (
		<section>
			<ul>{contactList}</ul>
		</section>
	);
}

export function Chat({contact}: {contact: Contact}) {
	const [text, setText] = useState('');

	console.log('[Chat] render');

	return (
		<section>
			<textarea
				value={text}
				placeholder={'Chat to ' + contact.name}
				onChange={(e) => setText(e.target.value)}
			/>
			<br />
			<button>Send to {contact.email}</button>
		</section>
	);
}
