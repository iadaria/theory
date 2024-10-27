import { type } from "os";
import { useState } from "react";

export function StateFormEx11() {
    const [to, setTo] = useState('Alice');
    const [message, setMessage] = useState('Hello');

    let varTo = 'Alice';
    let varMessage = 'Hi';

    function handleSubmitStates() {
    
        setTimeout(() => {
            alert(`You said '${message}' to ${to}`);
        }, 5000);
    }

    function handleSubmitVariables() {
        setTimeout(() => {
            console.log(`You said '${varMessage}' to ${varTo}`);
        }, 5000);
    }

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        handleSubmitStates();
        handleSubmitVariables();
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                To:{' '}
                <select
                    value={to}
                    onChange={(e) => {setTo(e.target.value); varTo = e.target.value}}
                >
                    <option value="Alice">Alice</option>
                    <option value="Bob">Bob</option>
                </select>
            </label>
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => {setMessage(e.target.value); varMessage = e.target.value}}
            />
            <button type="submit">Send</button>
        </form>
    );
}