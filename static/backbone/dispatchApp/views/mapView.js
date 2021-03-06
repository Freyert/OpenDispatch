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
      this.center = this.center.bind(this, map);
      this.initListening();
      this.render();//in case sync already happened.
    }.bind(this);
    GoogleMapLoader.load(init);
  },

  initListening: function () {
    this.collection.on('sync', this.render, this);
    this.collection.on('change:selected', this.center, this);
    this.collection.on('destroy', this.removeMarker, this);
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
      ride.set('marker', marker);
    });
  },

  center: function(map, model) {
    var latitude = model.get('start').latitude;
    var longitude = model.get('start').longitude;
    var latLng = { lat: latitude, lng: longitude };
    map.panTo(latLng);
    map.setZoom(15);
  },

  removeMarker: function(model) {
    model.get('marker').setMap(null);//Delets marker from the map.
  }
});
