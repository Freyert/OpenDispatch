var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var RideView = require('./rideView');

module.exports = Backbone.View.extend({
  el: '#ride-list',
  initialize: function () {
    var success = function () {
      console.log('fetched');
      this.render();
    }
    success = success.bind(this);
    this.collection.fetch({
      success: success
    });
    this.collection.on('sync', this.render, this);
    this.collection.on('change:selected', this.test, this);
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(ride) {
      var rideView = new RideView({model: ride});
      this.$el.append(rideView.render().el);
    }, this);
    return this;
  }
});

