import {PackingService} from "./PackingService.mjs";
import {Backpack} from "./Backpack.mjs";

const bp = new Backpack(8, 4, 2);
const listOfActions = [["pack", "small"], ["pack", "big"], ["pack", "big"], ["pack", "big"], ["unpack", "big"], ["pack", "medium"]];
const bpService = new PackingService(bp);
console.log(bpService.resolveQuery(listOfActions));

