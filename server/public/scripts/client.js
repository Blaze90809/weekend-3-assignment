$(document).ready(readyNow);


function readyNow(){
    console.log('JQ ready');
    getTasks();
    $('#submit').on(click, )
}


function getTasks(){
console.log('in tasks');
$.ajax({
    type: 'GET',
    url: '/getlist'
}).done(function(response){
    console.log('here are your list items:', response);

    appendDom();
}).fail(function(error){
    console.log('GET error', error)
})
}

function appendDom(){
    console.log('append DOM time');
    //here is where you will write the append functions
}