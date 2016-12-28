var PORT = process.env.PORT || 8080;
var express = require( 'express' );
var app = express();

//middleware
app.listen(PORT, function() {
  console.log('server listening on', PORT);
}); // end app listen
app.use(express.static('public'));

//routers
var employee = require('../routers/employee');
app.use('/employee', employee);
