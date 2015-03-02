require('./jqConfig.js')(); //Configure JQuery Global Settings.
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var PIDLoginView = require('./views/pidLoginView');
var WaitingView = require('./views/waitView');

var Routes = Backbone.Router.extend({
  pidLoginView: null,
  waitingView: null,

  initialize: function() {
    pidLoginView = new PIDLoginView();
  },

  routes: {
    "waiting": "wait"
  },

  wait: function () {
    if (this.waitingView == null) {
      this.waitingView = new WaitingView();
    }
    this.waitingView.render();
  }
});

$(document).ready(function () {
  var x = new Routes();
  Backbone.history.start();
});
