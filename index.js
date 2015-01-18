var express = require("express");
var url = require("url");
var bodyParser = require("body-parser");
var swagger = require("swagger-node-express");
var swagmodels = require("./swagger/swagmodels.js");
var swagsources = require("./swagger/swagresources.js");
var mongoose = require("mongoose");
var riderModel = require("./models/rider.js");

var PORT = 8002

//EXPRESS CONFIGURATION
var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log(Date.now() + ": " + req.path);
  next();
});
app.use('/swaggerui', express.static(__dirname + '/swagger/dist'));

//SWAGGER CONFIGURATION
swagger.setAppHandler(app);
swagger.addModels(swagmodels);

//MONGOOSE CONFIGURATION
mongoose.connect('mongodb://localhost/opendispatch');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log("DB connected");
        var Rider = riderModel(mongoose);
       //ROUTES
        swagger.configureSwaggerPaths("", "/api-docs", "");
        swagger.addGet(swagsources.findRiderById(swagger, Rider));
        swagger.addPost(swagsources.postRider(swagger, Rider));

        swagger.configure("http://localhost:" + PORT, "0.1");
        app.listen(PORT);
        console.log("Listening on " + PORT);
});
