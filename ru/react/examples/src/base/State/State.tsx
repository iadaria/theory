import { StateCounterEx12 } from "./StateCounterEx12";
import { StateFormEx11 } from "./StateFormEx11";
import { StateGallery } from "./StateGalleryEx16";

export function State() {
    let example;
    example = <StateFormEx11 />;
    example = <StateCounterEx12 />;
    example = <StateGallery />
    return example
}