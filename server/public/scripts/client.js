$(document).ready(readyNow);

var editing = false;
var idIn;

function readyNow(){
    console.log('JQ ready');
    getTasks();
    $('#submit').on('click', readyList);
    $('#taskList').on('click', '.deleteBTN', deleteFunction)
    $('#taskList').on('click', '.editBTN', editFunction)
    $('#taskList').on('click', '.completeBTN', completeFunction)
};


function getTasks(){
console.log('in tasks'); // OG get route to get list
$.ajax({
    type: 'GET',
    url: '/getlist'
}).done(function(response){
    console.log('here are your list items:', response);
    appendDom(response);
    
}).fail(function(error){
    console.log('GET error', error)
})
}; // end of OG get route

//create object to send.
function readyList(){
if (editing === true){
    sendEdits();
    editing = false;
    $('#submit').text('Submit');
    $('#enterTask').val('');
    $('#editing').text('');
    $('#completeBoolean').val('');
    
} else {

  var listItem = $('#enterTask').val();
  var completed = $('#completeBoolean').val();
  sendList = {
    task : listItem,
    completed: completed
  }
  postList(sendList);
  $('#enterTask').val(''); 
  $('#completeBoolean').val('');
}
}; 
// end readyList function. Getting ready to send POST route  
function postList(sendList){
  $.ajax({
      type: 'POST', // post route to add list items
      url: '/getlist',
      data: sendList
  }).done(function(response){
     console.log('sending this:', sendList);
     getTasks();
  }).fail(function(error){
      console.log('POST error', error);
  })
  }; // end of POST route

  //Append list items to the DOM
function appendDom(listItems){
    console.log('append DOM time', listItems);
    $('#taskList').empty();
    for (var i=0; i<listItems.length; i++){
    if (listItems[i].completed === false){
    var taskCompleteButton = '<button class="completeBTN">Task Completed</button>';}
    else {taskCompleteButton = ''}
    var id = listItems[i].ID;
    var task = listItems[i].task;
    var complete = listItems[i].completed;
    var deleteButton = '<button class="deleteBTN">Delete</button>';
    var editButton = '<button class="editBTN">Edit</button>';
    var $appendVar = $('<tr data-id="' + id + '"><td>' + task + '</td><td>' + complete + '</td><td>' + taskCompleteButton + '</td><td>' + deleteButton + '</td><td>' + editButton + '</td>');
    $appendVar.data('listItems', listItems[i]);
    $('#taskList').append($appendVar);
    }
    
}; // end Append Dom function

//Function to delete listItems
function deleteFunction(){
var id = ($(this).closest('tr').data().id);
$.ajax({
    method: 'DELETE',
    url: '/getlist/' + id
}).done(function(response){
    getTasks();
}).fail(function(error){
    console.log('error deleting', error);
})
}; // end Delete Function

// This function prepares the edit route.
function editFunction(){
   idIn = $(this).closest('tr').data('listItems').ID;
    var taskIn = $(this).closest('tr').data('listItems').task;
    var taskBool = $(this).closest('tr').data('listItems').completed;
    editing = true;
    $('#editing').text('Make your edits');
    $('#enterTask').val(taskIn);
    $('#completeBoolean').val(taskBool);
    $('#submit').text('Approve changes');
};

// This function sends edits to the database.
function sendEdits(){
    var listItem = $('#enterTask').val();
    var completed = $('#completeBoolean').val();
    sendList = {
      task : listItem,
      completed: completed
    }
    console.log('edits', sendList);
    $.ajax({
        method: 'PUT',
        url: '/getlist/' + idIn,
        data: sendList
    }).done(function(response){
        console.log('PUT route:', response);
        getTasks();
    }).fail(function(error){
        console.log('error sending lists:', error)
    })
};//end send edits function

// This function will mark tasks that are finished.
function completeFunction(){

    console.log('Task complete clicked');
    idIn = $(this).closest('tr').data('listItems').ID;
    console.log(idIn);
    $.ajax({
        method: 'PUT',
        url: '/getlist/complete/' + idIn,
    }).done(function(response){
       console.log('edit complete', response);
       getTasks();
    }).fail(function(error){
        console.log('error marking tasks as finished', error)
    })
   
};//End complete function