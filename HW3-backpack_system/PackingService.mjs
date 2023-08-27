import {Backpack} from "./Backpack.mjs";

export class PackingService{
    #counter;
    constructor(backpack) {
        this.backpack = backpack;
        this.#counter = 1;
    }

    pack(itemSize){
        if(this.backpack.compartments[itemSize].push(this.#counter) === false){
            return -1;
        } else{
            return this.#counter++;
        }
    }

    unpack(itemSize){
        if(this.backpack.compartments[itemSize].pop(this.#counter) === false){
            return -2;
        }else{
            return this.backpack.compartments[itemSize].size() + 2;
        }
    }

    resolveQuery(query){
        let result = [];
        for(let i = 0; i < query.length; i++){
            const operation = query[i][0];
            const itemSize = query[i][1];
            let resultItem = 0;
            if(operation === "pack"){
                resultItem = this.pack(itemSize);
            }
            else if(operation === "unpack"){
                resultItem = this.unpack(itemSize);
            }
            result.push(resultItem);
        }
        return result;
    }

}