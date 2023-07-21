export class Task{
    constructor(title, email, text, complete){
        this.title = title;
        this.email = email;
        this.text = text;
        this._isCompleted = complete;
    }
    get isCompleted(){
        return this._isCompleted;
    }
    set isCompleted(tmp){
        this._isCompleted = tmp;
    }
}
