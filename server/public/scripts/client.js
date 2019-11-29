$(document).ready(init);

function init () {
    console.log("hi again");
    $('#submitTask').on('click', onSubmitTask);
    getTasks();
}

function onSubmitTask(event) {
    console.log(`Hi`)
}

function getTasks () {
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

function render (response) {
    console.log(`in render with ${response}`)
    $('#showToDos').empty();
    const listOFToDos = response;

    for(let toDo of listOFToDos) {
        $('#showToDos').append(`<tr>
                                    <td>${toDo.task}</td>
                                    <td>${toDo.completed}</td>
                                    </tr>`);
    } 
}