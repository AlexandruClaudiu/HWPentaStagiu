import {LimitedStack} from "./LimitedStack.mjs";

export class Backpack{
    compartments = {};
    constructor(obj) {
        for(const [key, value] of Object.entries(obj)){
            this.compartments[key] = new LimitedStack(parseInt(value));
        }
    }
}