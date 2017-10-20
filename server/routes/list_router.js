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
var pool = new pg.Pool(config);

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

module.exports = router;