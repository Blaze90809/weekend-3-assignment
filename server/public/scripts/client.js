$(document).ready(readyNow);


function readyNow(){
    console.log('JQ ready');
    getTasks();
    $('#submit').on('click', readyList);
    $('#taskList').on('click', '.deleteBTN', deleteFunction)
}


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
} // end of OG get route

//create object to send.
function readyList(){
  var listItem = $('#enterTask').val();
  sendList = {
    task : listItem,
    completed: false,
  }
  postList(sendList); 
} 
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
  } // end of POST route

  //Append list items to the DOM
function appendDom(listItems){
    console.log('append DOM time', listItems);
    $('#taskList').empty();
    for (var i=0; i<listItems.length; i++){
    var id = listItems[i].ID;
    var task = listItems[i].task;
    var complete = listItems[i].completed;
    var taskCompleteButton = '<button class="completeBTN">Task Completed</button>';
    var deleteButton = '<button class="deleteBTN">Delete</button>';
    var editButton = '<button class="editBTN">Edit</button>';
    var appendVar = '<tr data-id="' + id + '"><td>' + task + '</td><td>' + complete + '</td><td>' + taskCompleteButton + '</td><td>' + deleteButton + '</td><td>' + editButton + '</td>';
    $('#taskList').append(appendVar);
    }
    
} // end Append Dom function

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
} // end Delete Function