import {Backpack} from "./Backpack.mjs";
export class PackingService{
    constructor(backpack) {
        this.backpack = backpack;
    }

    resolveQuery(query){
        let counter = 1;
        let result = [];
        for(let i = 0; i < query.length; i++){
            let packUnpack = query[i][0];
            let cntSize = query[i][1];
            if(packUnpack === "pack"){
                if(cntSize === "small"){
                    if(this.backpack.smallCnt.push(counter) === -1){
                        result.push(-1);
                    }else {
                        result.push(counter++);
                    }
                }
                else if(cntSize === "medium"){
                    if(this.backpack.mediumCnt.push(counter) === -1){
                        result.push(-1);
                    }else {
                        result.push(counter++);
                    }
                }
                else if(cntSize === "big"){
                    if(this.backpack.bigCnt.push(counter) === -1){
                        result.push(-1);
                    }else {
                        result.push(counter++);
                    }
                }
            }
            else if(packUnpack === "unpack"){
                if(cntSize === "small"){
                    if(this.backpack.smallCnt.pop(counter) === -1){
                        result.push(-2);
                    }else{
                        counter--;
                        result.push(counter++);
                    }
                }
                else if(cntSize === "medium"){
                    if(this.backpack.mediumCnt.pop(counter) === -1){
                        result.push(-2);
                    } else{
                        counter--;
                        result.push(counter++);
                    }
                }
                else if(cntSize === "big"){
                    if(this.backpack.bigCnt.pop(counter) === -1){
                        result.push(-2);
                    } else{
                        counter--;
                        result.push(counter++);
                    }
                }
            }
        }
        return result;
    }

}