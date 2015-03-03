var Backbone = require('backbone');
var $ = require('jquery');
require('../jqConfig')();
Backbone.$ = $;

var MapView = require('./views/mapView');
var ListView = require('./views/listView');
var Rides = require('./collections/rides');
$(document).ready(function() {
  var mapView = new MapView();
  var listView = new ListView({collection: new Rides()});
});
