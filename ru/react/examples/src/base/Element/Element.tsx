import { useEffect } from "react";
import { ex0_4_Tick } from "./ex0_4_Tick";


export function Element() {
    useEffect(() => {
        let timeId = setInterval(ex0_4_Tick, 1000);
        return () => clearInterval(timeId)
    }, []);


    return null;
}