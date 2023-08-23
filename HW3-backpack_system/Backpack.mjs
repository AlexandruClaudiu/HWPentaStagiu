import {LimitedStack} from "./LimitedStack.mjs";

export class Backpack{
    constructor(obj) {
        let capacities = [];
        for(const [key, value] of Object.entries(obj)){
            capacities.push(parseInt(value));
        }
        this.smallCnt = new LimitedStack(capacities[0]);
        this.mediumCnt = new LimitedStack(capacities[1]);
        this.bigCnt = new LimitedStack(capacities[2]);
    }
}