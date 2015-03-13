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
      var pid = this.pidInput.value;
      $.get("/rider/" + pid, this.validate);
    }
  },

  validate: function(user) {
    function postRide(position) {
      var data = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      };
      function success() {
        location.hash = '/waiting';
      };

      $.ajax({
        type: "POST",
        url: '/rides/' + user.pid,
        processData: false,
        contentType:'application/json',
        data: JSON.stringify(data),
        success: success
      });
    }

    if (user) {
      navigator.geolocation.getCurrentPosition(postRide);
    } else {
      console.log("User not found.");
    }
  }
});
