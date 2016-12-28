var PORT = process.env.PORT || 8080;
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var path = require( 'path' );
var pg = require( 'pg' );

//middleware
app.listen(PORT, function() {
  console.log('server listening on', PORT);
}); // end app listen
app.use(express.static('public'));
