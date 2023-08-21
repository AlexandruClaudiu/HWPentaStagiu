export class LimitedStack{
    constructor(capacity) {
        this.capacity = capacity;
        this.items = [];
    }
    push(item) {
        if (this.items.length < this.capacity) {
            this.items.push(item);
        } else {
            return -1;
        }
    }
    pop() {
        if (this.items.length > 0) {
            return this.items.pop();
        } else {
            return -1;
        }
    }
}