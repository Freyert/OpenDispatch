var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Ride = require('../models/rideModel');

module.exports = Backbone.Collection.extend({
  model: Ride,
  url: '/rides'
});

