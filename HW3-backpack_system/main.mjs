import {PackingService} from "./PackingService.mjs";
import {Backpack} from "./Backpack.mjs";

let backPack = {
    small: 8,
    medium: 4,
    big: 2
}

const bp = new Backpack(backPack);
const listOfActions = [["pack", "small"], ["pack", "big"], ["pack", "big"], ["pack", "big"], ["unpack", "big"], ["pack", "medium"]];
const bpService = new PackingService(bp);
console.log(bpService.resolveQuery(listOfActions));

