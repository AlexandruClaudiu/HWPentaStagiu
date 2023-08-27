export class LimitedStack{
    constructor(capacity) {
        this.capacity = capacity;
        this.items = [];
    }
    push(item) {
        if (this.items.length < this.capacity) {
            this.items.push(item);
            return true;
        } else {
            return false;
        }
    }
    pop() {
        if (this.items.length > 0) {
            this.items.pop();
            return true;
        } else {
            return false;
        }
    }
    size(){
        return this.items.length;
    }
}