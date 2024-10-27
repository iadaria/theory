import { useState } from 'react';

export function StateCounterEx12() {
    const [score, setScore] = useState(0);

    console.log(`${StateCounterEx12.name} render`)

    function increment() {
        setScore(score + 1);
    }

    function addToQueueIncrement() {
        setScore(prevScore => prevScore + 1);
    }

    return (
        <>
            <button onClick={() => increment()}>+1</button>
            <button
                onClick={() => {
                    increment();
                    increment();
                    increment();
                }}
            >
                +3
            </button>
            <h1>Score: {score}</h1>
            <button onClick={() => addToQueueIncrement()}>+1</button>
            <button
                onClick={() => {
                    addToQueueIncrement();
                    addToQueueIncrement();
                    addToQueueIncrement();
                }}
            >
                +3
            </button>
        </>
    );
}