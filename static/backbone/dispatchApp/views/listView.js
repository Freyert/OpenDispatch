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
  },

  render: function () {
    this.collection.each(function(ride) {
      console.log(ride);
      var rideView = new RideView({model: ride});
      this.$el.append(rideView.render().el);
    }, this);
    return this;
  }

});

