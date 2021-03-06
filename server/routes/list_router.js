var express = require('express');
var pg = require('pg');

var router = express.Router();
var config = {
    database: 'Deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}
var poolModule = require('../public/modules/pool.js');
var pool = poolModule;

// This function calls all of the list items
router.get('/', function(req, res){
    pool.connect(function(errorConnectingToDB, db, done) {
        if(errorConnectingToDB){
            console.log('error connecting to db', errorConnectingToDB);
            res.sendStatus(500);
        } else{
            var queryText = 'SELECT * FROM "TODO list" ORDER BY "ID" ASC;';
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making db query:', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    res.send(result.rows)
                }
            }); 
        } // end else statement
    })
}) // end .get route to put database on DOM

// This function posts list items.
router.post('/', function(req, res){
    var listItem = req.body;

    pool.connect(function(errorConnectingToDB, db, done){
    if(errorConnectingToDB){
        console.log('Error posting to DB', errorConnectingToDB);
        res.sendStatus(500);
    } else {
        var queryText = 'INSERT INTO "TODO list" ("task", "completed") VALUES ($1, $2);';
        db.query(queryText, [listItem.task, listItem.completed], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery){
                console.log('error sending POST', error)
                res.sendStatus(500);
            } else {
              res.send(result.rows);
            }
        })
    }
    })
}); //EndPostRoute

// This function deletes the list items.
router.delete('/:id', function(req, res){
    var listID = req.params.id;
     pool.connect(function(errorConnectingToDB, db, done){
         if(errorConnectingToDB){
             console.log('error connecting to DB', errorConnectingToDB);
             res.sendStatus(500);
         } else {
             var queryText = 'DELETE FROM "TODO list" WHERE "ID" = $1';
             db.query(queryText, [listID], function(errorMakingQuery, result){
                 done();
                 if(errorMakingQuery){
                     console.log('error making query', errorMakingQuery);
                 } else {
                     res.send(result.rows);
                 }
             })
         }
     })
}) //end delete route

//This function updates the list items.
router.put('/:id', function( req, res){
    var listID = req.params.id;
    var listItem = req.body;
    pool.connect(function(errorConnectingToDB, db, done){
        if(errorConnectingToDB){
            console.log('PUT error', errorConnectingToDB);
            res.sendStatus(500);
        } else {
            var queryText = 'UPDATE "TODO list" SET "task" = $1, "completed" = $2 WHERE "ID" = $3;'
            db.query(queryText, [listItem.task, listItem.completed, listID], function(errorMakingQuery, result){
                if(errorMakingQuery){
                    console.log('Error PUT query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(201);
                }
            })
        }
    })


}); //End PUT route

// This function marks tasks that are finished.
router.put('/complete/:id', function (req, res){
    var listID = req.params.id;
    pool.connect(function(errorConnectingToDB, db, done){
        if(errorConnectingToDB){
            console.log('PUT error', errorConnectingToDB);
            res.sendStatus(500);
        } else {
            var queryText = 'UPDATE "TODO list" SET "completed" = TRUE WHERE "ID" = $1;';
            db.query(queryText, [listID], function(errorMakingQuery, result){
                if(errorMakingQuery){
                    console.log('Error PUT query', errorMakingQuery);
                    res.sendStatus(500)
                } else{
                    res.sendStatus(201);
                }
            })

        }
    })
}); //end PUT route

module.exports = router;