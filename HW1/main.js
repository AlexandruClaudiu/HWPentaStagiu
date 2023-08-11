import {Task} from "./Task.js";

const tasksArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
const addButton = document.getElementById("add-task-btn");
const dialog = document.getElementById("dialog");
const cancelDialogBtn = document.getElementById("form-cancel-btn");
const saveDialogBtn = document.getElementById("form-save-btn");
const taskList = document.getElementById("task-list");
const completedTaskList = document.getElementById("completed-task-list");
const revealCompletedList = document.getElementById("reveal-completed-tasks");
const arrowBtn = document.getElementById("arrow-btn");
const errorMessageForm = document.getElementById("form-error");
let editId = -1;
let isCompletedListReveal = false;

addButton.onclick = () =>{
    clearDialog();
    saveDialogBtn.textContent = "Add";
    dialog.showModal();
}

cancelDialogBtn.onclick = () =>{
    clearDialog();
    dialog.close();
}

revealCompletedList.onclick = () =>{
    if(isCompletedListReveal){
        completedTaskList.style.display = "none";
        isCompletedListReveal = false;
        arrowBtn.src= "./icons/right-arrow.png"
    } else{
        completedTaskList.style.display = "block";
        isCompletedListReveal = true;
        arrowBtn.src= "./icons/down-arrow.png"
    }
    displayTasks();
}

function updateNumberCompletedTasks(){
    let numberOfCompletedTasks = 0;
    for(let i = 0; i < tasksArray.length; i++){
        if(tasksArray[i]._isCompleted === true){
            numberOfCompletedTasks++;
        }
    }
    document.getElementById("no-completed-tasks").innerHTML = "Completed: " + numberOfCompletedTasks;
    if(numberOfCompletedTasks === 0){
        completedTaskList.style.display = "none";
        arrowBtn.src= "./icons/right-arrow.png"
    }
}

function addDeleteEventListeners(){
    document.querySelectorAll(".delete-btn").forEach((db, i)=>{
        db.addEventListener("click", ()=>{
            deleteTask(i);
        })
    })
}
function addEditEventListeners(){
    document.querySelectorAll(".edit-btn").forEach((db, i) =>{
        db.addEventListener("click", ()=>{
            saveDialogBtn.textContent = "Edit";
            document.getElementById("form__name").value = tasksArray[i]._title;
            document.getElementById("form__assignee").value = tasksArray[i]._assignee;
            document.getElementById("form__task-dsc").value = tasksArray[i]._text;
            editId = i;
            dialog.showModal();
        })
    })
}

function clearDialog(){
    document.getElementById("form__name").value = "";
    document.getElementById("form__assignee").value = "";
    document.getElementById("form__task-dsc").value = "";
    errorMessageEmail.textContent = "";
    errorMessageTitle.textContent = "";
    errorMessageForm.textContent = "";
}

function addToggleCompleteEventListeners(){
    document.querySelectorAll(".complete-task-btn").forEach((db, i)=>{
        db.addEventListener("click", () =>{
            let taskCompleted = tasksArray[i]._isCompleted;
            if(taskCompleted === true){
                tasksArray[i]._isCompleted = false;
                const tmp = tasksArray[i];
                tasksArray.splice(i, 1);
                tasksArray.unshift(tmp);
            } else {
                tasksArray[i]._isCompleted = true;
                const tmp = tasksArray[i];
                tasksArray.splice(i, 1);
                tasksArray.push(tmp);
            }
            localStorage.setItem("tasks", JSON.stringify(tasksArray));
            displayTasks();
            updateNumberCompletedTasks();
        })
    })}


saveDialogBtn.onclick = () =>{
    const name = document.getElementById("form__name");
    const assignee = document.getElementById("form__assignee");
    const dsc = document.getElementById("form__task-dsc");
    if(inputTitle.value === ""){
        errorMessageTitle.textContent = "This cannot be empty!";
    }
    if(errorMessageEmail.value === ""){
        errorMessageEmail.textContent = "This cannot be empty!";
    }
    if(inputEmail.textContent !== "" || errorMessageEmail.textContent !== ""){
        errorMessageForm.textContent = "Solve all the errors first!";
    } else{
        errorMessageForm.textContent = "";
        const task = new Task(name.value, assignee.value, dsc.value);
        if(editId !== -1){
            addTask(task, editId);
        } else {
            addTask(task);
        }
    }
}

function displayTasks(){
    let tasks = "";
    let completedTasks = "";
    for(let i = 0; i < tasksArray.length; i++){
        let isCompleted = tasksArray[i]._isCompleted;
        let task = "";
        task += `<li>
                    <div class="task-cnt">
                        <div class="task-cnt__heading">
                            <h3 class="heading__title">`;
        if(isCompleted === true){
            task += `<s>${tasksArray[i]._title}</s>`;
        } else {
            task += `${tasksArray[i]._title}`;
        }
        task += `</h3>
                            <button class="complete-task-btn"></button>
                        </div>
                        <h5 class="heading__assignee">${tasksArray[i]._assignee}</h5>
                        <p class="task__dsc">
                            ${tasksArray[i]._text}
                        </p>
                        <div class="buttons-cnt">
                            <button class="action-buttons delete-btn">Delete</button>
                            <button class="action-buttons edit-btn">Edit</button>
                        </div>
                    </div>
                </li>`;
        if(isCompleted === true){
            completedTasks += task;
        } else{
            tasks += task;
        }
    }
    completedTaskList.innerHTML = completedTasks;
    taskList.innerHTML = tasks;
    addDeleteEventListeners();
    addEditEventListeners();
    addToggleCompleteEventListeners();
}

function addTask(task){
    if(editId !== -1){
        tasksArray[editId] = task;
    } else {
        tasksArray.push(task);
    }
    editId = -1;
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    updateNumberCompletedTasks();
    displayTasks();
    dialog.close();
}

function deleteTask(i){
    tasksArray.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    updateNumberCompletedTasks();
    displayTasks();
}


window.onload = () =>{
    displayTasks();
    completedTaskList.style.display = "none";
}

//Errors

const inputTitle = document.getElementById("form__name");
const errorMessageTitle = document.getElementById("title-error");

inputTitle.addEventListener("input", ()=>{
    const inputValue = inputTitle.value.trim();
    if(inputValue === ""){
        errorMessageTitle.textContent = "Title cannot be empty!";
    }
    else if (!/^[a-zA-Z0-9\s]+$/.test(inputValue)) {
        errorMessageTitle.textContent = "Only alphanumeric characters are allowed.";
    } else {
        errorMessageTitle.textContent = "";
    }
})

const inputEmail = document.getElementById("form__assignee");
const errorMessageEmail = document.getElementById("email-error");

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

inputEmail.addEventListener("input", ()=>{
    const inputValue = inputEmail.value.trim();
    if(inputValue === ""){
        errorMessageEmail.textContent = "Title cannot be empty!";
    }
    else if (!isValidEmail(inputValue)) {
        errorMessageEmail.textContent = "Please enter a valid email address.";
    } else {
        errorMessageEmail.textContent = "";
    }
})