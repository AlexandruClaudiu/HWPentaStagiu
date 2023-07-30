import {Task} from "./Task.js";
var taskArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
const addDialogButton = document.getElementById("add-task");
const addDialog = document.getElementById("add-dialog");
const closeDialog = document.getElementById("cancel-form-btn");
const confirmTask = document.getElementById("confirm-form-btn");

for(let i = 0; i < taskArray.length; i++){
    if(taskArray[i].isCompleted){
        taskArray.push(taskArray.splice(i, 1)[0]);
    }
}

addDialogButton.addEventListener("click", ()=>{
    addDialog.showModal();
})

closeDialog.addEventListener("click", ()=>{
    addDialog.close();
})

confirmTask.addEventListener("click", ()=>{
    const title = document.getElementById("form-title").value;
    const email = document.getElementById("form-email").value;
    const text = document.getElementById("form-text").value;
    var currentTask = new Task(title, email, text, false);
    addTask(currentTask);
})



function displayTasks(){
    let tasks = "";
    for(let i = 0; i < taskArray.length; i++){
        if(taskArray[i].isCompleted == true){
            tasks += `<li class="task">
                        <div class="task-element">
                            <div class="buttons-container">
                                <button id="complete-task-btn" class="feature-buttons complete-btn" style="background-color: #2eea50; color:white;">
                                    ✓
                                </button>
                                <button id="delete-task-btn" class="feature-buttons delete-btn">
                                    ✗
                                </button>
                            </div>
                            <div class="task-content" style="background-color: #2eea50;">
                                <div class="task-element-top">
                                    <h1 class="task-title"><s>${taskArray[i].title}</s></h1>
                                    <h4 class="task-assignee">${taskArray[i].email}</h4>
                                </div>
                                <p class="task-info"><s>
                                        ${taskArray[i].text}
                                    </s>
                                </p>
                            </div>
                        </div>
                    </li>`
        } else{
            tasks += `<li class="task">
                            <div class="task-element">
                                <div class="buttons-container">
                                    <button id="complete-task-btn" class="feature-buttons complete-btn">
                                        ✓
                                    </button>
                                    <button id="delete-task-btn" class="feature-buttons delete-btn">
                                        ✗
                                    </button>
                                </div>
                                <div class="task-content">
                                    <div class="task-element-top">
                                        <h1 class="task-title">${taskArray[i].title}</h1>
                                        <h4 class="task-assignee">${taskArray[i].email}</h4>
                                    </div>
                                    <p class="task-info">
                                        ${taskArray[i].text}
                                    </p>
                                </div>
                            </div>
                        </li>`
        }
        
    }
    document.getElementById("tasks-list").innerHTML = tasks;
    addDeleteFunction();
    addCompleteFunction();
}

function addDeleteFunction(){
    let deleteButtonsArray = document.querySelectorAll(".delete-btn");
    deleteButtonsArray.forEach((btn, i) => {
       btn.addEventListener("click", ()=>{deleteTask(i)});
    });
}

function addCompleteFunction(){
    let completeButtonsArray = document.querySelectorAll(".complete-btn");
    completeButtonsArray.forEach((btn, i) =>{
        btn.addEventListener("click", ()=>{completeTask(i)});
    })
}

function addTask(task){
    taskArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    location.reload();
}

function deleteTask(i){
    taskArray.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    location.reload();
}

function completeTask(i){
    let completed = taskArray[i].isCompleted;
    if(completed == true){
        taskArray[i].isCompleted = false;
    } else{
        taskArray[i].isCompleted = true;
    }
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    location.reload();
}

window.onload = function(){
    displayTasks();
}