$(document).ready(readyNow);


function readyNow(){
    console.log('JQ ready');
    getTasks();
    $('#submit').on('click', postList);
}


function getTasks(){
console.log('in tasks'); // OG get route to get list
$.ajax({
    type: 'GET',
    url: '/getlist'
}).done(function(response){
    console.log('here are your list items:', response);

    
}).fail(function(error){
    console.log('GET error', error)
})
} // end of OG get route

function postList(){
  var listItem = $('#enterTask').val();
  sendList = {
    task : listItem,
    completed: false,
  } 
  $.ajax({
      type: 'POST', // post route to add list items
      url: 'postlist/',
      data: sendList
  }).done(function(response){
     console.log('sending this:', sendList);

  }).fail(function(error){
      console.log('POST error', error);
  })
  } // end of POST route

function appendDom(){
    console.log('append DOM time');
    //here is where you will write the append functions
    
}