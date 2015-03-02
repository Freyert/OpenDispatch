var Backbone = require('backbone');
var $ = require('jquery');
require('../jqConfig')();
Backbone.$ = $;

var DispatchView = require('./dispatchView');

$(document).ready(function() {
  var dispatchView = new DispatchView();
});
