var Backbone = require('backbone');
var $ = require('jquery');
var GoogleMapLoader = require('google-maps');
Backbone.$ = $;
GoogleMapLoader.VERSION = '3.14';

module.exports = Backbone.View.extend({
  el: "body",
  initialize: function () {
    GoogleMapLoader.load(function(google) {
      var mapOptions = { 
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
      //google.map.event.addDomListener(window, 'load', initialize);
    });
  }
});
