var express = require("express");
var url = require("url");
var bodyParser = require("body-parser");
var swagger = require("swagger-node-express");
var swagmodels = require("./swagger/swagmodels.js");
var swagsources = require("./swagger/swagresources.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/swaggerui', express.static(__dirname + '/swagger/dist'));

swagger.setAppHandler(app);
swagger.addModels(swagmodels);
//ROUTES
swagger.configureSwaggerPaths("", "/api-docs", "");
swagger.addGet(swagsources.findRiderById(swagger, null));

swagger.configure("http://localhost", "0.1");
app.listen(8002);
