export function EventCapture() {
	return (
		<div onClick={() => {
            console.log('[parent] runs')
        }}>
            <div
                onClickCapture={() => {
                            console.log('Runs first')
                    /* this runs first */
                }}
            >
                <button onClick={(e) => console.log('[button] runs')} >Default</button>
                <button onClick={(e) => e.stopPropagation()}>Silent</button>
            </div>
        </div>
	);
}
