var sendDocs = require('./resource').prototype.sendDocs; //TODO: Have resource object encapsulate the whole spiel.

exports.getAll = function(swagger, Ride) {
  return {
    "spec": {
      "description": "Gets a list of all current Rides, pending and in progress.",
      "path": "/rides",
      "notes": "Gets a list of all Rides in the database",
      "summary": "Get a list of all Rides",
      "method": "GET",
      "type": "Ride",
      "nickname": "getRides"
    },
    "action": function(req, res) {
      var sendRides = sendDocs.bind(res);
      Ride.find({}, sendRides);
    }
  };
};

exports.getByRiderId = function (swagger, Ride) {
  return {
    "spec": {
      "description": "Gets a Ride instance by the Rider's ID",
      "path": "/rides/{riderId}",
      "summary": "Gets a Rider by ID",
      "method": "GET",
      "parameters": [
        swagger.paramTypes.path("riderId", "ID of Rider on Ride", "int32")
      ],
      "type": "Ride",
      "nickname": "getRideByID"
    },
    "action": function(req, res) {
      var id = parseInt(req.params.riderId);
      var sendRide = sendDocs.bind(res);
      Ride.find({pid: id}, sendRide);
    }
  };
};
/*
TODO:
Ideally this would fill in the end time and archive
the ride for historical and analytic purposes.
We'll do that later though.
*/
exports.end = function (swagger, Ride) {
  return {
    "spec": {
      "description": "Using a Ride's id, ends a Ride instance.",
      "path": "/rides/{riderId}",
      "method": "DELETE",
      "parameters": [
        swagger.paramTypes.path("riderId", "ID of Rider on Ride", "int32"),
      ],
      "summary": "Ends a ride",
      "type": "Ride",
      "nickname": "endRide"
    },
    "action": function(req, res) {
      Ride.remove({pid: parseInt(req.params.riderId) }, function(err, result) {
        if (result) {
          res.status(200).end();
        }
        else {
          res.send(err);
        }
      });
    }
  };
};

exports.post = function (swagger, Ride, Rider) {
  return {
    "spec": {
      "description": "Using a Rider, creates a new Ride instance.",
      "path": "/rides/{riderId}",
      "method": "POST",
      "parameters": [
        swagger.paramTypes.path("riderId", "ID of Rider on Ride", "int32"),
        swagger.paramTypes.body("position", "Position of Rider", "Position")
      ],
      "summary": "Posts a new Ride",
      "type": "Ride",
      "nickname": "postRide"
    },
    "action": function(req, res) {
      var id = parseInt(req.params.riderId);
      function createRide(err, rider) {
        if (rider) {
          var start = {
            "time": Date.now(),
            "longitude": req.body.longitude,
            "latitude": req.body.latitude
          };
          var rideObj = {
            "pid": rider.pid,
            "firstName": rider.firstName,
            "lastName": rider.lastName,
            "start": start
          };
          var ride = new Ride(rideObj);
          ride.save(function (err) {
            if (err) {
              res.send(err);
            }
            else {
              res.status(200).end();
            }
          });
        } else {
          res.send(err);
        }
      }
      Rider.findOne({pid: id }, createRide);
    }
  };
};
