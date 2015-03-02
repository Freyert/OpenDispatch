var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: 'body',
  render: function() {
    this.$el.html("<h1>Waiting</h1>");
    this.text = this.$("h1");
    this.interval = window.setInterval(this.updateProgress.bind(this), 1000);
    //this.connect();
    return this;
  },

  connect: function() {
    this.socket = new WebSocket("ws:" + location.host + "/wait");
    this.socket.onmessage(function(event) {
      console.log(event);
    });

  },

  updateProgress: function() {
    this.text.append(" . ");
  },

  tearDown: function() {
    this.socket.close();
    window.clearInterval(this.interval);
  }
});
