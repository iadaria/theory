export function Ex0_7_Form() {
	function handleClick(e: any) {
		console.log('You clicked on the link');
	}

    function handleClickWithPreventing(e: React.SyntheticEvent) {
        e.preventDefault();
        console.log('You clicked on the link');
    }

	return (
		<div>
            <a href="https://google.com" onClick={handleClick}>
                Click on me
            </a>
            <br/>
            <br/>
            <a href="https://google.com" onClick={handleClickWithPreventing}>
            Click on me with preventing
            </a>
        </div>
	);
}
