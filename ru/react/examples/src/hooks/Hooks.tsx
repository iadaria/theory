import { AppSuspense } from "../features/AppSuspense";
import { Example1, Example2 } from "../features/simple/hz";
import { WithoutDeffered } from "./deffered/WithoutDeffered";
import { UseTransition } from "./transition/UseTransition/UseTransition";
import { WithoutTransition } from "./transition/WithoutTransition/WithoutTransition";
import { UseCallback } from "./UseCallback";
import { UseRef } from "./UseRef";


export function Hooks() {
    let hook = <UseCallback />;

    hook = <UseRef />;
  
    hook = <AppSuspense />;
  
    hook = <WithoutTransition />;
  
    hook = <UseTransition />
  
    hook = <WithoutDeffered />
  
    hook = <Example1 />
  
    hook = <Example2 />
  
    return hook;
}