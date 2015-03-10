var Backbone = require('backbone');
var $ = require('jquery');
var GoogleMapLoader = require('google-maps');
Backbone.$ = $;
GoogleMapLoader.VERSION = '3.14';

module.exports = Backbone.View.extend({
  el: "body",
  initialize: function () {
    var init = function(google) {
      var mapOptions = { 
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
      this.render = this.render.bind(this, google, map);
      //google.map.event.addDomListener(window, 'load', initialize);
      this.listenTo(this.collection, 'change', this.render);
      //This here is a hack to get it to work now.
      //TODO: Collections should be preloaded.
      this.collection.fetch();
      this.render();
    }.bind(this);
    GoogleMapLoader.load(init);
  },

  render: function(google, map) {
    this.collection.each(function(ride) {
      var latitude = ride.get("start").latitude;
      var longitude = ride.get("start").longitude;
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        title: ride.get("firstName")
      });
      console.log(marker);
    });
  }
});
