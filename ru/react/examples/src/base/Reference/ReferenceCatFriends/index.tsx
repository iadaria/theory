import './referenceCatFriends.css';
import {useRef} from 'react';

export function ReferenceCatFriends() {
	const firstCatRef = useRef<any>(null);
	const secondCatRef = useRef<any>(null);
	const thirdCatRef = useRef<any>(null);

	function handleScrollToFirstCat() {
		firstCatRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}

	function handleScrollToSecondCat() {
		secondCatRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}

	function handleScrollToThirdCat() {
		thirdCatRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}

	return (
		<>
			<nav>
				<button onClick={handleScrollToFirstCat}>Neo</button>
				<button onClick={handleScrollToSecondCat}>Millie</button>
				<button onClick={handleScrollToThirdCat}>Bella</button>
			</nav>
			<div>
				<ul>
					<li>
						<img
							src="https://placecats.com/neo/300/200"
							alt="Neo"
							ref={firstCatRef}
						/>
					</li>
					<li>
						<img
							src="https://placecats.com/millie/200/200"
							alt="Millie"
							ref={secondCatRef}
						/>
					</li>
					<li>
						<img
							src="https://placecats.com/bella/199/200"
							alt="Bella"
							ref={thirdCatRef}
						/>
					</li>
				</ul>
			</div>
		</>
	);
}
