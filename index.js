var express = require("express");
var url = require("url");
var bodyParser = require("body-parser");
var swagger = require("swagger-node-express");
var swagmodels = require("./swagger/swagmodels.js");
var mongoose = require("mongoose");

//Resources and Models
var swaggerPath = "./swagger/";
var modelPath = "./models/";
var riderResource = require(swaggerPath + "riderResource.js");
var driverResource = require(swaggerPath + "driverResource.js");
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
        swagger.addGet(swagsources.findRiderById(swagger, Rider));
        swagger.addPost(swagsources.postRider(swagger, Rider));
        swagger.addPost(swagsources.postRide(swagger, Ride, Rider));


        var Driver = driverModel(mongoose);
        swagger.addGet(driverResource.findById(swagger, Driver));
        swagger.addGet(riderResource.findById(swagger, Rider));
        swagger.addPost(riderResource.postRider(swagger, Rider));


        var Ride = rideModel(mongoose);
        swagger.addGet(swagsources.getRides(swagger, Ride));
        swagger.addGet(swagsources.getRideByRiderId(swagger, Ride));
        swagger.addDelete(swagsources.endRide(swagger, Ride));

        //HOST CONFIGURATION
        swagger.configureSwaggerPaths("", "/api-docs", "");
        swagger.configure(HOST, "0.1");
        app.listen(PORT);
        console.log("Running at " + HOST);
});
