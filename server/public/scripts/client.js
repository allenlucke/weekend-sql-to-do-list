$(document).ready(init);

function init() {
    $('#submitTask').on('click', onSubmitTask);
    $('#showToDos').on('click', '#deleteButton', onDeleteTask);
    getTasks();
}

function onSubmitTask(event) {
    const newToDo = {
        task: $('#taskDescription').val(),
        completed: $('#taskCompletion').val()
    };
    console.log(newToDo)
    postTask(newToDo);
    $('#taskDescription').val('');
    $('#taskCompletion').val('');
}

function onDeleteTask(event) {
    const idNumber = $(this).data('id');
    deleteTask(idNumber);
}

function deleteTask(idNumber) {
    $.ajax({
        method: 'DELETE',
        url: '/api/to-do/' + idNumber
    })
    .then((response) => {
        getTasks();
    })
    .catch((response) => {
        console.warn(response);
    })
}

function getTasks(event) {
    $.ajax({
        method: 'GET',
        url: '/api/to-do',
    })
    .then((response) => {
        console.log(`GET ${response}`);
        render(response);
    })
    .catch((err) => {
        console.warn(err);
    })
}

function postTask(newToDo) {
    console.log(newToDo);
    $.ajax({
        method: 'POST',
        url: '/api/to-do',
        data: newToDo,
    })
    .then((response)=> {
    console.log(`POST To-Do`);
    getTasks(); 
    })
    .catch((err) => {
        console.warn(err);
    }) 
}

function render(response) {
    console.log(`in render with ${response}`)
    $('#showToDos').empty();
    const listOFToDos = response;

    for(let toDo of listOFToDos) {
        $('#showToDos').append(`<tr>
                                    <td>${toDo.task}</td>
                                    <td>${toDo.completed}</td>
                                    <td><button id="changeStatus" data-trans="${toDo.completed} data-id="${toDo.id}>Change Status</button></td>
                                    <td><button id="deleteButton" data-id="${toDo.id}">Delete</button></td>
                                    </tr>`);
    } 
}