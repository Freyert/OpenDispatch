var express = require("express");
var url = require("url");
var bodyParser = require("body-parser");
var swagger = require("swagger-node-express");
var swagmodels = require("./swagger/swagmodels.js");
var swagsources = require("./swagger/swagresources.js");
var mongoose = require("mongoose");
var riderModel = require("./models/rider.js");
var rideModel = require("./models/ride.js");

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
        var Rider = riderModel(mongoose);
        var Ride = rideModel(mongoose);
       //REST ROUTES
        swagger.configureSwaggerPaths("", "/api-docs", "");
        swagger.addGet(swagsources.findRiderById(swagger, Rider));
        swagger.addGet(swagsources.getRides(swagger, Ride));
        swagger.addGet(swagsources.getRideByRiderId(swagger, Ride));
        swagger.addPost(swagsources.postRider(swagger, Rider));
        swagger.addPost(swagsources.postRide(swagger, Ride, Rider));
        swagger.addDelete(swagsources.endRide(swagger, Ride));
        swagger.configure(HOST, "0.1");
        app.listen(PORT);
        console.log("Running at " + HOST);
});
