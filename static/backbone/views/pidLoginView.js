/*
 * Handles the logic for Riders to login
 * with just their PID on their login page.
 */

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: $("[name='pid-login']"),

  initialize: function() {
    this.pidInput = this.$el.find("[name='id-entry']")[0];
  },

  events: {
    "click [name='id-submit']": "submit"
  },

  submit: function() {
    if (this.pidInput.checkValidity()) {
      $.get("/rider/" + this.pidInput.value, this.validate);
    }
  },

  validate: function(user) {
    if (user) {
      console.log(user);
    } else {
      console.log("User not found.");
    }
  }
});
