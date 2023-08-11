export class Task{
    constructor(title, assignee, text, isCompleted = false) {
        this._title = title;
        this._assignee = assignee;
        this._text = text;
        this._isCompleted = isCompleted;
    }
}