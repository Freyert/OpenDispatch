var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;


var template = "<strong><%= pid %></strong>: \
  <%= firstName + ' ' + lastName %> ";

module.exports = Backbone.View.extend({
  tagName: 'li',
  template: _.template(template),
  events: {
    "click": "select"
  },
  initialize: function() {
    this.render();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  select: function() {
    this.$el.toggleClass('selected');
    this.model.set('selected', !this.model.get('selected'));
  }
});
