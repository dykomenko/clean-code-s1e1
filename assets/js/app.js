var taskInput = document.getElementById('new-task');//Add a new task.
var addButton = document.querySelector('.addButton');//first button
var incompleteTaskHolder = document.getElementById('incompleteTasks');//ul of #incompleteTasks
var completedTasksHolder = document.getElementById('completed-tasks');//completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement('li');
    //input (checkbox)
    var checkBox = document.createElement('input');//checkbx
    
    //label
    var label = document.createElement('label');//label

    //input (text)
    var editInput = document.createElement('input');//text

    //button.edit
    var editButton = document.createElement('button');//edit button

    //button.delete
    var deleteButton = document.createElement('button');//delete button
    var deleteButtonImg = document.createElement('img');//delete button image

    label.innerText = taskString;
    label.className = 'task';

    //Each elements, needs appending
    checkBox.type = 'checkbox';
    editInput.type = 'text';
    editInput.className = 'task';

    editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
    editButton.className = 'edit';

    deleteButton.className = 'delete';
    deleteButtonImg.src = './assets/images/remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


var addTask = function () {
    console.log('Add Task...');
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
}


var editTask = function () {
    console.log('Edit Task...');
    console.log('Change \'edit\' to \'save\'');

    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector('label');
    var editBtn = listItem.querySelector('.edit');
    var containsClass = listItem.classList.contains('editMode');
    //If class of the parent is .editmode
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }
    listItem.classList.toggle('editMode');
};


var deleteTask = function () {
    console.log('Delete Task...');
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}


var taskCompleted = function () {
    console.log('Complete Task...');
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function () {
    console.log('Incomplete Task...');
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


addButton.addEventListener('click', addTask);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log('bind list item events');
    var checkBox = taskListItem.querySelector('input[type=checkbox]');
    var editButton = taskListItem.querySelector('button.edit');
    var deleteButton = taskListItem.querySelector('button.delete');
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}