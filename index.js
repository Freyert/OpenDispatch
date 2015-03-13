var express = require("express");
var url = require("url");
var bodyParser = require("body-parser");
var swagger = require("swagger-node-express");
var swagmodels = require("./swagger/swagmodels.js");
var mongoose = require("mongoose");


/* TODO
  Set an index.js in the resources and Models directory that will suck
  all of these modules into one object. (questionable)

  Or perhaps work in such a way that they configure everything
  outside of this index file. (warmer)
*/

//Resources
var swaggerPath = "./swagger/";
var riderResource = require(swaggerPath + "riderResource.js");
var driverResource = require(swaggerPath + "driverResource.js");
var rideResource = require(swaggerPath + 'rideResource');

//Models
var modelPath = "./models/";
var riderModel = require(modelPath + "rider.js");
var driverModel = require(modelPath + "drivers.js");
var rideModel = require(modelPath + "ride.js");

const PORT = 8002
const HOST = 'http://localhost:' + PORT;
const MONGO_HOST = 'mongodb://localhost/27017';

//EXPRESS CONFIGURATION
var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log(Date.now() + ": " + req.path);
  next();
});
app.use('/swaggerui', express.static(__dirname + '/swagger/dist'));
app.use(function(err, req, res, next){
  console.error(err.stack);
  next(err);
});
app.set('view engine', 'jade');
//SWAGGER CONFIGURATION
swagger.setAppHandler(app);
swagger.addModels(swagmodels);

//UI ROUTES
app.get('/', function(req, res) {
  res.render('rideRequest');
});

app.get('/dispatch', function(req, res) {
  res.render('dispatch');
});

//MONGOOSE CONFIGURATION
mongoose.connect(MONGO_HOST);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log("DB connected");
        //REST ROUTES
        var Rider = riderModel(mongoose);
        swagger.addGet(riderResource.findById(swagger, Rider));
        swagger.addPost(riderResource.post(swagger, Rider));


        var Driver = driverModel(mongoose);
        swagger.addGet(driverResource.findById(swagger, Driver));


        var Ride = rideModel(mongoose);
        swagger.addGet(rideResource.getAll(swagger, Ride));
        swagger.addGet(rideResource.getByRiderId(swagger, Ride));
        swagger.addPost(rideResource.post(swagger, Ride, Rider));
        swagger.addDelete(rideResource.end(swagger, Ride));

        //HOST CONFIGURATION
        swagger.configureSwaggerPaths("", "/api-docs", "");
        swagger.configure(HOST, "0.1");
        app.listen(PORT);
        console.log("Running at " + HOST);
});
