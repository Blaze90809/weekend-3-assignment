var express = require('express');
var pg = require(pg);

var router = express.Router();
var config = {
    database: 'Deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}
var pool = new pg.pool(config);

router.get('/', function(req, res){
    pool.connect(function(errorConnectingToDB, db, done) {
        if(errorConnectingToDB){
            console.log('error connecting to db', errorConnectingToDB);
            res.sendStatus(500);
        } else{
            var queryText = //fill in database stuff
        }
    })
})