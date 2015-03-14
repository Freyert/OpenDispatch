var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;


var template = "<strong><%= pid %></strong>: \
  <%= firstName + ' ' + lastName %> ";

var deleteButton = '<button type="button">DELETE</button>'

module.exports = Backbone.View.extend({
  tagName: 'li',
  template: _.template(template),
  events: {
    "click": "select",
    "click button": "deleteModel"
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
    this.model.get('selected') ? this.$el.append(deleteButton) :
                                 this.$el.children('button').remove();
  },

  deleteModel: function() {
    var tearDown = this.tearDown.bind(this);
    this.model.destroy({success: tearDown});
  },

  tearDown: function(model, response) {
    console.log(response);
    console.log(this);
    this.remove();
  }
});
