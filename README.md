# weekend-3-assignment

This weekend challenge calls for the creation of a TODO App. I will create a 'TO DO' application that will allow users to create and edit a list of things they have to finish.

This project can be found on the URL: https://frozen-sierra-56156.herokuapp.com/

Steps:
[X] Create all the documents required to finish this product.
[X] NPM install, body-parser.
[X] Source in HTML files, including bootstrap and jquery.
[X] Write interface that allows user to create a task.
[X] Each item should have an option to complete or delete.
[X] Create AJAX GET, POST ROUTES.
[X] Write code to display to DOM.
[X] Create route for delete.
[X] Create route for edit.
[X] Create data table in SQL.
[X] Insert query.
[X] Select query.
[X] Style project.
[X] Add to Heroku.

<h1>Table Setup</h1>

CREATE TABLE "TODO list" (
"ID" serial primary key,
"task" varchar(120),
"completed" boolean
);