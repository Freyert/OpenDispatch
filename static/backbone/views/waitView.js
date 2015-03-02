var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: 'body',
  render: function() {
    this.$el.html("<h1>Waiting</h1>");
    return this;
  }
});
