/**
Dependency Inject Swagger and Database Reference into the Resources.
*/
/*
  Used on response objects.
  sendDocs.call(res).
  sendDocs.bind(res).
*/
function sendDocs(err, docs) {
  if (docs) {
    this.send(JSON.stringify(docs));
  }
  else {
    this.status(404).send(err);
  }
};


exports.findRiderById = function(swagger, Rider) {
  return {
    'spec': {
      "description": "Selects Riders by id",
      "path": "/rider/{riderId}",
      "notes": "Returns a Rider based on ID",
      "summary": "Find Rider by ID",
      "method": "GET",
      "parameters" : [
        swagger.pathParam(
          "riderId",
          "ID of Rider that needs to be fetched",
          "int32"
        )
      ],
      "type": "Rider",
      "errorResponses": [swagger.errors.invalid('id'),
                         swagger.errors.notFound('rider')
                        ],
      "nickname": "getRiderById"
      },
      'action': function(req, res) {
        if(!req.params.riderId) {
          throw console.log("Invalid ID");
        }
        else {
          var id = parseInt(req.params.riderId);
          var sendRider = sendDocs.bind(res);

          Rider.findOne({pid: id}, sendRider);

        }
      }
  };
};

exports.postRider = function (swagger, Rider) {
  return {
    "spec": {
      "description": "Posts a new Rider",
      "path": "/rider",
      "notes": "Adds a new Rider to the Database",
      "summary": "Post a new Rider to the Database",
      "method": "POST",
      "parameters": [swagger.paramTypes.body("body", "Rider object to be added", "Rider")],
      "type": "Rider",
      "errorResponses": [swagger.errors.invalid('id')],
      "nickname": "postRider"
    },
    "action": function(req, res) {
      var rider = new Rider(req.body);
      rider.save(function (err) {
        if(err) {
          res.send(err);
        }
        else res.status(200).end();
      })
    }
  }
};

exports.getRides = function(swagger, Ride) {
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

exports.getRideByRiderId = function (swagger, Ride) {
  return {
    "spec": {
      "description": "Gets a Ride instance by the Rider's ID",
      "path": "/rides/{riderId}",
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

exports.postRide = function (swagger, Ride, Rider) {
  return {
    "spec": {
      "description": "Using a Rider, creates a new Ride instance.",
      "path": "/rides/{riderId}",
      "method": "POST",
      "parameters": [
        swagger.paramTypes.path("riderId", "ID of Rider on Ride", "int32"),
        swagger.paramTypes.body("position", "Position of Rider", "Position")
      ],
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


/*
TODO:
Ideally this would fill in the end time and archive
the ride for historical and analytic purposes.
We'll do that later though.
*/
exports.endRide = function (swagger, Ride) {
  return {
    "spec": {
      "description": "Using a Ride's id, ends a Ride instance.",
      "path": "/rides/{riderId}",
      "method": "DELETE",
      "parameters": [
        swagger.paramTypes.path("riderId", "ID of Rider on Ride", "int32"),
      ],
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
