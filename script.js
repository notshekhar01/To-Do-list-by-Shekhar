const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask(){
    const task = taskInput.value.trim(); //to make sure spaces are trimmed
    if(task) {
        createTaskElement(task);

        taskInput.value = ""; //empty the input after adding
        saveTasks(); //to save the task in local storage, tasks array
    } else {
        alert("Please enter a task");
    }
}

addButton.addEventListener("click", addTask);

function createTaskElement(task){
    const listItem = document.createElement("li");
    listItem.innerText = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "delete";
    deleteButton.className = "deleteTask";

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    deleteButton.addEventListener("click", function(){
        taskList.removeChild(listItem);
        saveTasks();
    });
}

function saveTasks(){
    let tasks = [];
    taskList.querySelectorAll("li").forEach( function(item){
        tasks.push(item.innerText.replace('delete' ,'').trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}