var Backbone = require('backbone');
var $ = require('jquery');
require('../jqConfig')();
Backbone.$ = $;

var MapView = require('./views/mapView');
var ListView = require('./views/listView');
var Rides = require('./collections/rides');
$(document).ready(function() {
  var rides = new Rides(); //Every view shares the same collection.
  var mapView = new MapView({collection: rides});
  var listView = new ListView({collection: rides});
});
