$(document).ready(init);

function init() {
    $('#submitTask').on('click', onSubmitTask);
    $('#showToDos').on('click', '#deleteButton', onDeleteTask);
    $('#showToDos').on('click', '#changeStatus', onChangeStatus);
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
    const idNumberToDelete = $(this).data('id');
    console.log(idNumberToDelete);
    deleteTask(idNumberToDelete);
}

function onChangeStatus(event) {
    const idNumberToPut = $(this).data('id');
    let status = true;
    const completed = $(this).data('trans');
    console.log(completed, idNumberToPut);

    if( completed == 'yes' || completed == 'Yes' || completed == 'Y' || completed == 'y') {
        status = 'No';
    }else {
        status = 'Yes';
    }
    putCompletionTask(status, idNumberToPut);
}

function putCompletionTask(status, idNumberToPut) {
    console.log(status, idNumberToPut);
    $.ajax({
        method: 'PUT',
        url: '/api/to-do/' + idNumberToPut,
        data: {
            completed: status
        }
    })
    .then((response) => {
        console.log('PUT complete');
        getTasks();
    })
    .catch((err) => {
        console.warn(err);
    })
}


function deleteTask(idNumberToDelete) {
    $.ajax({
        method: 'DELETE',
        url: '/api/to-do/' + idNumberToDelete
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
                                    <td><button id="changeStatus" data-trans="${toDo.completed}" data-id="${toDo.id}">Change Status</button></td>
                                    <td><button id="deleteButton" data-id="${toDo.id}">Delete</button></td>
                                    </tr>`);
    } 
}