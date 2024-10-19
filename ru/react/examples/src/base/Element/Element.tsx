import { FormWithOriginStates } from "./Ex0_10_Form";
import { Ex0_11_Managed } from "./Ex0_11_Managed";
import { ShowTickButton } from "./ex0_4_Tick";
import { Clock } from "./ex0_5_Tick";
import { Ex0_7_Form } from "./ex0_7_Form";
import { NumberList } from "./ex0_9_List";

export function Element() {

    let example = <ShowTickButton />

    example = <Clock />

    example = <Ex0_7_Form />

    example = <NumberList numbers={[1, 2, 3, 4, 5]} />

    example = <FormWithOriginStates />

    example = <Ex0_11_Managed />

    return example;
}