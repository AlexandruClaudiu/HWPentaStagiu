import {LimitedStack} from "./LimitedStack.mjs";

export class Backpack{
    constructor(smallCntCapacity, mediumCntCapacity, bigCntCapCapacity) {
        this.smallCnt = new LimitedStack(smallCntCapacity);
        this.mediumCnt = new LimitedStack(mediumCntCapacity);
        this.bigCnt = new LimitedStack(bigCntCapCapacity);
    }
}