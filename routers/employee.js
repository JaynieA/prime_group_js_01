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
}); // end app get

//Inserts new employees
router.post('/', urlEncodedParser, function(req, res) {
  console.log('post route hit');
  pg.connect(connString, function(err, client, done){
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      var query = client.query('INSERT INTO employee (first_name, last_name, employee_number, annual_salary, rating) VALUES ($1, $2, $3, $4, $5)', [req.body.first_name, req.body.last_name, req.body.number, req.body.annual_salary, req.body.rating]);
      query.on('end', function() {
        res.send(true);
      }); // end query function
    } // end else
  }); // end pg connect
}); // end post


module.exports = router;
