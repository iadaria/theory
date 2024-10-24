import { TPlace } from "./data";

export function getImageUrl(place: TPlace) {
    return 'https://i.imgur.com/' + place.imageId + 'l.jpg';
}