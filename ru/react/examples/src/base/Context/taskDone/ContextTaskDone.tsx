import {useContext, useState} from 'react';
import {Size, TPlace, places} from './data';
import {getImageUrl} from './utils';
import { ImageSizeContext } from './ImageSizeContext';

export default function ContextTaskDone() {
	const [isLarge, setIsLarge] = useState(false);
	const imageSize = isLarge ? Size.SM : Size.XS;
	return (
		<ImageSizeContext.Provider value={imageSize}>
			<label>
				<input
					type="checkbox"
					checked={isLarge}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setIsLarge(e.target.checked);
					}}
				/>
				Use large images
			</label>
			<hr />
			<List />
		</ImageSizeContext.Provider>
	);
}

function List() {
	const listItems = places.map((place) => (
		<li key={place.id}>
			<Place place={place}  />
		</li>
	));
	return <ul>{listItems}</ul>;
}


function Place({place}: { place: TPlace}) {
	return (
		<>
			<PlaceImage place={place} />
			<p>
				<b>{place.name}</b>
				{': ' + place.description}
			</p>
		</>
	);
}

function PlaceImage({place}: { place: TPlace}) {
	const imageSize = useContext(ImageSizeContext);
	return (
		<img
			src={getImageUrl(place)}
			alt={place.name}
			width={imageSize}
			height={imageSize}
		/>
	);
}
