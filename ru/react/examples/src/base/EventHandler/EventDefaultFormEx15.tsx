export function EventDefaultForm() {
    return (
        <>
            <form onSubmit={() => alert('Submitting!')}>
                <input />
                <button>Send</button>
            </form>
            <form onSubmit={(e) => {
                e.preventDefault();
                alert('Submitting with preventing!')
            }}>
                <input />
                <button>Send with preventing</button>
            </form>
        </>
    );
}