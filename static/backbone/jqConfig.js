/*
 * This module configures the JQuery Object
 * to handle a lot of common methods such as
 * responding to AJAX errors politely.
 */
var $ = require('jquery');

function config() {
  //AJAX
  $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
    alert(thrownError);
  });
}

module.exports = config;
