import {StateCounterEx12} from './StateCounterEx42';
import {StateFormEx11} from './StateFormEx41';
import {StateGallery} from './StateGalleryEx43';
import {StateGalleryTwo} from './StateGalleryTwoEx44';

export function State() {
	let example;
	example = <StateFormEx11 />;
	example = <StateCounterEx12 />;
	example = <StateGallery />;
	example = <StateGalleryTwo />;
	return example;
}
