var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );

//middleware
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );

//connect to database
var connString = require( '../modules/connection' );

//Gets all employees
router.get('/', function(req, res) {
  var employees = [];
  pg.connect(connString, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      var query = client.query('SELECT * FROM employee');
      query.on('row', function(row) {
        employees.push(row);
      }); // end query.on
      query.on( 'end', function() {
        //disconnect from database
        done();
        res.send({employees: employees});
      }); // end query end
    } // end else
  }); // end pg connect
  //res.send(true);
}); // end app get


module.exports = router;
